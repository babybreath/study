# 桥联模式
1. 使用命令 ip addr 查看当前网卡设置
2. vi /etc/sysconfig/network-scripts/你的网卡配置文件
3. 将 ONBOOT=no 改为 ONBOOT=yes (此时重启将由路由器DHCP自动分配IP，为了固定IP继续设置)
4. 将 BOOTPROTO=dhcp 删除
5. 补上配置： 
	IPADDR0=192.168.1.120   IP设置
	GATEWAY0=192.168.1.1    网关设置
	PREFIX=24               子网掩码
	DNS1=192.168.1.1        DNS设置
6. 重启生效