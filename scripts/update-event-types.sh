#!/usr/bin/env bash 
# See https://bit.ly/2xsgk47 for details

# Strict
set -o errexit -o pipefail

# Constants
readonly url=https://bit.ly/2z4dsuv
readonly file=event-types.json
readonly dir=_source/_data

main() {
    event-types-download
    echo
    event-types-update
    echo
    event-types-diff
}

event-types-download() {
    banner "Downloading jar from $url..."
    wget -O - --no-check-certificate $url | jar x $file || die "Could not download file"
}

event-types-update() {
    banner "Updating $file..."
    echo "moving $file to $dir"
    mv $file $dir || die "Could not mv file"
}

event-types-diff() {
    banner "Showing differences in $file..."
    git --no-pager diff $dir/$file || die "Could not diff file"
}

# Utilities
banner() { local -r line=$(printf -- '-%.0s' {1..100}); status $line; status "$1"; status $line; }
status() { green "$1"; }
die()    { red "${1:-Exiting}" >&2 && exit 1; }
green()  { ansi 32 "$@"; }
red()    { ansi 91 "$@"; }
ansi()   { echo -e "\033[${1}m${*:2}\033[0m"; }

# Entry point
main
