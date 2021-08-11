# certbot-hook-example

这是 certbot 通过 DNS 解析验证来申请 let's encrypt 证书的示例，
包含两个国内云服务 DNS 的解析，阿里云 DNS 和腾讯云 DNSPod。目前配合计划任务可无限期自动更新免费的 let's encrypt 证书。  
运行环境为 Linux，需要准备好 certbot 和 node.js，并使用 root 权限执行命令  
## dnspod 配置  
### 安装依赖
cd ./dnspod
npm i
### API访问授权配置 
修改config/index.js
```
secretId: '',
secretKey: '',
```

## aliyun配置  
### 安装依赖
cd ./dnspod
npm i
### API访问授权
修改config/index.js
```
accessKeyId: '',
accessKeySecret: '',
```

## 执行示例（dnspod）
```
certbot certonly --manual --preferred-challenges dns --manual-auth-hook 'node ./dnspod/auth.js' --manual-cleanup-hook 'node ./dnspod/cleanup.js' --register-unsafely-without-email --agree-tos -d *.your.domain
```

## 注意
如通过计划任务自动更新证书，默认需要在过期前一个月内才能申请，否则自动执行会中断，需要修改/etc/letsencrypt/renewal下域名配置文件中下面这个值(取消注释)

```
# renew_before_expiry = 30 days
```

需要确保 90 - renew_before_expiry 值 < 执行周期  
例如，可以无脑设置为90，这样过期前什么时候申请都可以（符合[频次限制](https://letsencrypt.org/zh-cn/docs/rate-limits/)的前提下）

```
renew_before_expiry = 90 days
```

[参考文档](https://certbot.eff.org/docs/using.html#pre-and-post-validation-hooks)
