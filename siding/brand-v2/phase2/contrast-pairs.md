# Contrast pairs, measured (Phase 2)

Every pair the system renders. Each ratio is computed with the WCAG 2 relative-luminance formula from the token values in this thread. Nothing is estimated.

- **Text:** 4.5:1 required.
- **Non-text UI and graphics:** 3:1 required.

The identity board re-measures each pair from computed styles in Chromium; see the "Contrast, re-measured in the browser" panel.

| Foreground role | Value | Background role | Value | Ratio | Needs | Result | Use |
|---|---|---|---|---|---|---|---|
| text-primary (neutral-13) | #131619 | surface-on-dark (white) | #FFFFFF | 18.16:1 | 4.5:1 | PASS | button text on the light surface |
| surface-on-dark (white) | #FFFFFF | bg-deep (steel-12) | #16293B | 14.85:1 | 3.0:1 | PASS | light control on the dark close |
| surface-on-dark (white) | #FFFFFF | bg-accent-field (steel-9) | #396791 | 5.96:1 | 3.0:1 | PASS | light control on the steel field |
| error-ink-on-dark (white) | #FFFFFF | bg-deep (steel-12) | #16293B | 14.85:1 | 4.5:1 | PASS | error text on the dark form |
| text-primary (neutral-13) | #131619 | bg-page (white) | #FFFFFF | 18.16:1 | 4.5:1 | PASS | body text |
| text-primary (neutral-13) | #131619 | bg-subtle (neutral-2) | #F0F2F4 | 16.18:1 | 4.5:1 | PASS | body text on band |
| text-primary (neutral-13) | #131619 | bg-sunken (neutral-3) | #E5E8EB | 14.76:1 | 4.5:1 | PASS | input text |
| text-primary (neutral-13) | #131619 | bg-accent-subtle (steel-2) | #ECF3FA | 16.23:1 | 4.5:1 | PASS | body on steel tint |
| text-secondary (neutral-11) | #484E53 | bg-page (white) | #FFFFFF | 8.43:1 | 4.5:1 | PASS | captions |
| text-secondary (neutral-11) | #484E53 | bg-subtle (neutral-2) | #F0F2F4 | 7.51:1 | 4.5:1 | PASS | captions on band |
| text-secondary (neutral-11) | #484E53 | bg-accent-subtle (steel-2) | #ECF3FA | 7.54:1 | 4.5:1 | PASS | captions on steel tint |
| text-muted (neutral-9) | #5E6469 | bg-page (white) | #FFFFFF | 6.00:1 | 4.5:1 | PASS | meta |
| text-muted (neutral-9) | #5E6469 | bg-subtle (neutral-2) | #F0F2F4 | 5.34:1 | 4.5:1 | PASS | meta on band |
| text-accent (steel-11) | #295073 | bg-page (white) | #FFFFFF | 8.44:1 | 4.5:1 | PASS | links |
| text-accent (steel-11) | #295073 | bg-subtle (neutral-2) | #F0F2F4 | 7.52:1 | 4.5:1 | PASS | links on band |
| text-accent (steel-11) | #295073 | bg-accent-subtle (steel-2) | #ECF3FA | 7.54:1 | 4.5:1 | PASS | links on steel tint |
| text-on-accent (white) | #FFFFFF | bg-accent-field (steel-9) | #396791 | 5.96:1 | 4.5:1 | PASS | text on the steel field and on the primary button |
| text-on-accent (white) | #FFFFFF | accent-solid-hover (steel-10) | #2E5A82 | 7.24:1 | 4.5:1 | PASS | primary button hover |
| text-on-accent (white) | #FFFFFF | accent-solid-active (steel-11) | #295073 | 8.44:1 | 4.5:1 | PASS | primary button pressed |
| text-inverse (white) | #FFFFFF | bg-deep (steel-12) | #16293B | 14.85:1 | 4.5:1 | PASS | footer text |
| text-inverse-secondary (steel-5) | #C2D6EB | bg-deep (steel-12) | #16293B | 9.98:1 | 4.5:1 | PASS | footer secondary |
| text-inverse (white) | #FFFFFF | bg-inverse (neutral-13) | #131619 | 18.16:1 | 4.5:1 | PASS | caption plate |
| error-ink (neutral-13) | #131619 | bg-page (white) | #FFFFFF | 18.16:1 | 4.5:1 | PASS | error message |
| border-control (neutral-9) | #5E6469 | bg-page (white) | #FFFFFF | 6.00:1 | 3.0:1 | PASS | input and secondary button edge |
| border-control (neutral-9) | #5E6469 | bg-sunken (neutral-3) | #E5E8EB | 4.87:1 | 3.0:1 | PASS | input edge on its well |
| accent-solid (steel-9) | #396791 | bg-page (white) | #FFFFFF | 5.96:1 | 3.0:1 | PASS | primary button and course line against the page |
| focus-ring (steel-9) | #396791 | bg-page (white) | #FFFFFF | 5.96:1 | 3.0:1 | PASS | focus ring |
| focus-ring (steel-9) | #396791 | bg-subtle (neutral-2) | #F0F2F4 | 5.31:1 | 3.0:1 | PASS | focus ring on band |
| focus-ring-on-dark (white) | #FFFFFF | bg-accent-field (steel-9) | #396791 | 5.96:1 | 3.0:1 | PASS | focus ring on steel |
| focus-ring-on-dark (white) | #FFFFFF | bg-deep (steel-12) | #16293B | 14.85:1 | 3.0:1 | PASS | focus ring on dark |
| mark (steel-9) | #396791 | bg-page (white) | #FFFFFF | 5.96:1 | 3.0:1 | PASS | logo mark (graphic) |
| accent-line-on-dark (steel-6) | #B2CBE4 | bg-deep (steel-12) | #16293B | 8.88:1 | 3.0:1 | PASS | course line on dark |

**32 pairs measured, 0 failing.**

Not used as text anywhere:
- steel-8 #6790B8 (3.36:1 with white);
- neutral-8 #888D92 (3.35:1 on white).

Neither appears in a text role, and no semantic role points at either one.
