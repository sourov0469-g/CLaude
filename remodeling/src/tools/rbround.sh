#!/bin/bash
# REBRAND QA round: build, then on all five pages: rendered contrast (p6qa), accent + hue audit (rbaudit), hierarchy (rbtype)
# usage: tools/rbround.sh <tag>
T=$1; Q=/home/user/CLaude/remodeling/qa; S=file:///home/user/CLaude/remodeling/site
cd /home/user/CLaude/remodeling/src && python3 build.py > /dev/null 2>&1
HOME_S=hero,proof,services,ba,process,financing,work,reviews,towns,consult
PAGES="kitchens:kitchen-intro,kitchen-scope,kitchen-work bathrooms:bath-intro,bath-build,bath-work renovation:reno-intro,reno-services,reno-permits contact:contact-form,contact-visit,contact-area"
PREFIX=$T-home- node tools/p6qa.js c > /dev/null 2>&1
FILE=$S/elbaz-homepage.html SECS=$HOME_S SLOTS=1,2,3,4,5,6,7,8 OUT=$Q/$T-home-accent.txt node tools/rbaudit.js > /dev/null 2>&1
FILE=$S/elbaz-homepage.html SECS=$HOME_S SLOTS=1,2,3,4,5,6,7,8 OUT=$Q/$T-home-type.txt node tools/rbtype.js > /dev/null 2>&1
for pg in $PAGES; do n=${pg%%:*}; s=${pg#*:}
  FILE=$S/$n.html SW=12345 PREFIX=$T-$n- node tools/p6qa.js c $s > /dev/null 2>&1
  FILE=$S/$n.html SECS=$s OUT=$Q/$T-$n-accent.txt node tools/rbaudit.js > /dev/null 2>&1
  FILE=$S/$n.html SECS=$s OUT=$Q/$T-$n-type.txt node tools/rbtype.js > /dev/null 2>&1
done
echo "== contrast"; for f in $Q/$T-*-c.txt; do echo "$(basename $f): $(tail -1 $f)"; done
echo "== accent > 5% or off-window"; cat $Q/$T-*-accent.txt | awk -F'\t' '/accent area/ { split($2,a," "); v=a[3]+0; if (v>5) print }'; grep -h -A3 "OFF-WINDOW" $Q/$T-*-accent.txt | grep -v "^--" | sort | uniq -c
echo "== type"; grep -h "FAIL\|version fails\|page:" $Q/$T-*-type.txt
