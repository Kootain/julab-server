#!/bin/sh

exec 2>&-

iwp=`iwpriv ra0 get_sta_info|sed -n '3,$p'|awk '{print $1}'`
echo "$iwp"|while read mac
do
   o=`grep "$mac" /tmp/dhcp.leases |head -1|awk '{print $3, $4}'`
   [ "$o" != "" ] && {
        echo "$mac $o"
   }
done