#!/bin/sh
# builds only the siding page, and wraps the booking wire (the Contact page is another builder's stub) so a missing form cannot stop the boot
cd /home/user/CLaude/siding/redo/final && PAGES_ONLY=siding OUT=out/final-siding.html python3 build_final.py && sed -i "s/FPContact\.wire(document);/try{FPContact.wire(document);}catch(_){}/;s/FPWindows\.wire(document);/try{FPWindows.wire(document);}catch(_){}/" out/final-siding.html
