---
title: RustDesk সার্ভার Pro
description: "RustDesk সার্ভার Pro এর সম্পূর্ণ গাইড  প্রিমিয়াম সেলফ-হোস্টেড রিমোট ডেস্কটপ সমাধান। এন্টারপ্রাইজ অথেনটিকেশন (OIDC, LDAP, 2FA), web console, API অ্যাক্সেস এবং প্রফেশনাল ডিপ্লয়মেন্টের জন্য উন্নত নিরাপত্তা নিয়ন্ত্রণ অন্তর্ভুক্ত।"
keywords: ["rustdesk সার্ভার pro", "rustdesk pro সার্ভার", "রিমোট ডেস্কটপ সার্ভার", "এন্টারপ্রাইজ রিমোট অ্যাক্সেস", "rustdesk প্রফেশনাল", "সেলফ-হোস্টেড rdp", "rustdesk এন্টারপ্রাইজ", "রিমোট ডেস্কটপ সলিউশন", "rustdesk licensing", "rustdesk web console"]
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk সার্ভার Pro তে ওপেন সোর্স ভার্সন এর  তুলনায় আরউ অনেক ফিচার  আছে।।  

- অ্যাকাউন্ট  
- [Web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)  
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)  
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)  
- ঠিকানা   
- লগ ম্যানেজমেন্ট (কানেকশন, ফাইল ট্রান্সফার, অ্যালার্ম ইত্যাদি)  
- ডিভাইস ম্যানেজমেন্ট  
- [নিরাপত্তা সেটিংস সিঙ্ক](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)  
- [অ্যাক্সেস কন্ট্রোল](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)  
- [একাধিক রিলে সার্ভার](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (স্বয়ংক্রিয়ভাবে নিকটতম রিলে নির্বাচন করে)  
- [কাস্টম ক্লায়েন্ট জেনারেটর](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)  
- WebSocket  
- Web ক্লায়েন্ট সেলফ-হোস্ট  

{{% notice note %}}
আপনি যদি নিজের বাড়ি/অফিসে সার্ভার তৈরি করেন এবং পাবলিক IP/ডোমেইনের মাধ্যমে কানেক্ট করতে না পারেন, তাহলে এই  [আর্টিকেলটি](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/) দেখুন
{{% /notice %}}

{{% notice note %}}
পরবর্তী ধাপে যাওয়ার  আগে এটা পড়ুন: [সেলফ-হোস্টেড সার্ভার কিভাবে কাজ করে?](/docs/en/self-host/#how-does-self-hosted-server-work)  
{{% /notice %}}

## প্রয়োজনীয় হার্ডওয়্যার

সর্বনিম্ন লেভেল VPS এর আপনার ব্যবহারের জন্য যথেষ্ট। সার্ভার সফটওয়্যার CPU বা মেমরি ইন্টেন্সিভ নয়। আমাদের পাবলিক ID সার্ভার 2 CPU/4 GB Vultr সার্ভার 1.0 + মিলিয়ন এন্ডপয়েন্ট সার্ভ করে। প্রতিটি রিলে কানেকশন  সেকন্ডে  180kb খরচ করে। 1 CPU কোর এবং 1GB RAM 1000 রিলে কনকারেন্ট কানেকশন দেয়ার জন্য যথেষ্ট।  

## আর্টিকেল টিউটোরিয়াল
[ধাপে ধাপে গাইড: Docker এর মাধ্যমে ক্লাউডে সেলফ-হস্ট RustDesk সার্ভার Pro নিরাপদ রিমোট অ্যাক্সেসের জন্য](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)  

## ভিডিও টিউটোরিয়াল

[শুরু করুন: সেলফ-হস্ট RustDesk সার্ভার Pro নভাইস Linux ব্যবহারকারীর জন্য](https://www.youtube.com/watch?v=MclmfYR3frk)  

[সংক্ষিপ্ত গাইড: সেলফ-হস্ট RustDesk সার্ভার Pro এডভান্স Linux ব্যবহারকারীর জন্য](https://youtu.be/gMKFEziajmo)  

## লাইসেন্স

লাইসেন্স পেতে পারেন [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), আরও বিস্তারিত জানার জন্য [লাইসেন্স](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) দেখুন। 

## শুরু করুন
### ১. ইনস্টলেশন

```bash
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```
বিস্তারিত তথ্যের জন্য দেখুন [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/)

### ২. প্রয়োজনীয় পোর্ট

আপনাকে TCP পোর্ট `21114`-`21119` এবং UDP পোর্ট `21116` খুলতে হবে। ফায়ারওয়াল এবং Docker পোর্ট ম্যাপিং সেট করার সময় এই পোর্টগুলি নিশ্চিত করুন।

এই পোর্টগুলির আরও তথ্যের জন্য দেখুন [এখানে](/docs/en/self-host/rustdesk-server-oss/install/#ports)

### ৩. লাইসেন্স সেট করা

`http://<server ip>:21114` অ্যাক্সেস করে web console খুলুন, ডিফল্ট ক্রেডেনশিয়াল `admin/test1234` দিয়ে [লগইন করুন](/docs/en/self-host/rustdesk-server-pro/console/#log-in)

## সার্ভার আপগ্রেড

[এই গাইডটি](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/?utm_source=chatgpt.com#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) কিভাবে  RustDesk সার্ভার লউ ভার্সন থেকে Pro ভার্সনে আপগ্রেড করতে হয় তা দেখানো হয়েছে বিভিন্ন ইন্সটলেশন মেথড এর মাধ্যমে।

## নতুন হোস্টে মাইগ্রেশন এবং ব্যাকআপ / রিস্টোর

বিস্তারিত [টিউটোরিয়াল](https://github.com/rustdesk/rustdesk-server-pro/discussions/184?utm_source=chatgpt.com)

## লাইসেন্স মাইগ্রেশন

অনুগ্রহ করে এই [গাইডটি](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/?utm_source=chatgpt.com#invoices-license-retrieval-and-migration) ফোলো করুন।

## লাইসেন্স আপগ্রেড

যেকোনো সময় আরও উজারস এবং ডিভাইসের জন্য লাইসেন্স আপগ্রেড করতে [এই গাইডটি](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) ফোলো করুন।


## নিরাপত্তা সম্পর্কিত তথ্য

https://github.com/rustdesk/rustdesk/discussions/9835

