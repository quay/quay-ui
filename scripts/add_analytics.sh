#!/bin/bash

# set -x 
STAGING_URL=https://www.redhat.com/ma/dpal-staging.js
PRODUCTION_URL=https://www.redhat.com/ma/dpal.js
DPAL_URL=''

if [ "$REACT_APP_QUAY_DOMAIN" == "stage.quay.io" ]
then
    DPAL_URL=$STAGING_URL
fi

if [ "$REACT_APP_QUAY_DOMAIN" == "quay.io" ]
then
    DPAL_URL=$PRODUCTION_URL
fi
 
if [ ! -z "$DPAL_URL" ]
then
    HEADER="<script id=\"dpal\" src=\"$DPAL_URL\" type=\"text/javascript\"></script>"
    read -r -d '' FOOTER << EOM
    <script type="text/javascript"> \
        if (("undefined" !== typeof _satellite) && ("function" === typeof _satellite.pageBottom)) { \
            _satellite.pageBottom(); \
        } \
    </script>
EOM

    sed "/<head>/a\\
        $HEADER" ../src/index.html > temp.html
    
    mv temp.html ../src/index.html

    sed "/<\/body>/i\\
        $FOOTER" ../src/index.html > temp.html

    mv temp.html ../src/index.html

    echo "Added Adobe Analytics $DPAL_URL"

fi

