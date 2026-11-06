#!/bin/sh
# builds only the roofing page; wraps the other pages' wire calls (stubs / other builders) so they cannot stop the boot
cd /home/user/CLaude/siding/redo/final && PAGES_ONLY=roofing OUT=out/final-roofing.html python3 build_final.py && sed -i "s/FPContact\.wire(document);/try{FPContact.wire(document);}catch(_){}/;s/FPWindows\.wire(document);/try{FPWindows.wire(document);}catch(_){}/;s/FPSiding\.wire(document);/try{FPSiding.wire(document);}catch(_){}/;s/FPOurWork\.wire(document);/try{FPOurWork.wire(document);}catch(_){}/" out/final-roofing.html
