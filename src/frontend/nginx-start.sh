#!/bin/sh
#
# Bash script to start nginx replacing the base href from the webphone container
#
# Replaces the base href before starting nginx if the BASE_HREF environment variable is set
#
export DOLAR=$

baseHref="/"
export BASE_HREF=$baseHref

if [[ -n "${BASE_HREF}" ]]; then
    if [ $baseHref != "/" ]; then
		sed -i 's|<base href="/"|<base href="'$BASE_HREF'\/"|g' /usr/share/nginx/html/index.html
	fi
	envsubst < /etc/nginx/conf.d/nginx-default.tmpl > /etc/nginx/conf.d/default.conf
fi
unset DOLAR
nginx -g "daemon off;"
