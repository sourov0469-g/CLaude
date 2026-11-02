"""Back up exactly the versions a change touches: `before` saves every version's HTML; `after` compares and writes the
old HTML of each changed version to backups/ with the next revision number (images stripped, ids prefixed).
Run: python3 -I brand-v2/build/backup_changed.py before|after"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import snapshot  # noqa: E402
STATE = os.path.join(HERE, '.versions-before.json')

if __name__ == '__main__':
    if sys.argv[1] == 'before':
        json.dump(snapshot.versions(), open(STATE, 'w'))
        print('saved state of', sum(len(v) for v in json.load(open(STATE)).values()), 'versions')
    else:
        old, new = json.load(open(STATE)), snapshot.versions()
        changed = [(s, v) for s in old for v in old[s] if old[s][v] != new.get(s, {}).get(v)]
        for sid, v in changed:
            rev = 1 + len([f for f in os.listdir(snapshot.BK) if f.startswith(f'{sid}-v{v}-r')])
            open(os.path.join(snapshot.BK, f'{sid}-v{v}-r{rev}.html'), 'w', encoding='utf-8').write(
                snapshot.prefix_ids(snapshot.strip_images(old[sid][v]), f'{sid}v{v}r{rev}'.replace('-', '')))
        os.remove(STATE)
        print(len(changed), 'versions changed and backed up:', ' '.join(f'{s}:{v}' for s, v in changed))
