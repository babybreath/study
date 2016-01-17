# centos7配置yum源
1. cd /etc/yum.repos.d  进入yum源配置目录
2. mv CentOS-Base.repo CentOS-Base.repo.bk 备份系统自带的yum源配置文件
3. wget http://mirrors.aliyun.com/repo/Centos-7.repo  下载阿里云yum源
4. yum clean all  清理yum缓存
5. yum update 升级软件包
6. yum makecache 设置本地缓存