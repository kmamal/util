#!/usr/bin/env bash

set -eEu -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$DIR/.."

EXPORTS=$(find "./src/" -name *.js \
	| grep -v 'node_modules' \
	| grep -v '.test.js' \
	| grep -v '/testing/' \
	| grep -vE '/_[^/]+' \
	| jq --raw-input --slurp '.
			| split("\n") | .[:-1]
			| map(.
				| (
					if . == "./src/index.js" then ""
					elif .|endswith("/index.js") then .[5:-9]
					else .[5:-3] end
				) as $key
				| {("." + $key): (.)}
			)
			| add
		')

cp package.json package.json~
jq ".exports=${EXPORTS}" < package.json~ > package.json
