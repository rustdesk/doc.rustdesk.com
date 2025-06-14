---
title: Strategy
weight: 200
---

Strategy is a tool for RustDesk administrators to update the security options of client settings pages in bulk. Administrators can create different strategies and apply them to different devices.

## Create Strategies

You can create a new strategy by clicking the `+` button and perform various actions on the strategy by hovering over it and clicking the menu.

In the pop-up menu, you can choose to `Enable` or `Disable` the strategy, `Rename`, `Duplicate` or `Delete` it. Additionally, you can click `Edit Devices` to modify the devices applied to that strategy or click `Edit Users` to modify the users applied to that strategy.

On the right side of the strategy menu, you can see the number of devices actually applied to the strategy, taking into account the priority of the strategy.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Device Strategy, User Strategy and Device Group Strategy

Strategies are applied according to the following priority order:
1. Device Strategy (Highest priority)
2. User Strategy
3. Device Group Strategy (Lowest priority)

Each device can only be managed by one strategy at a time. The priority system works as follows:
- Device strategies take priority over both user strategies and device group strategies
- User strategies take priority over device group strategies
- Device group strategies apply to all devices in the device group that don't have a device strategy or user strategy assigned


## Edit Devices

When you click the `Edit Devices` menu, an editing dialog box displaying all the devices will open. You can change the selection status of the checkboxes and then click the `Save` button to apply the device changes made on the current page. If you need to modify devices on other pages, please navigate to those pages. You can also use the drop-down menu in the upper right corner to filter devices.

Strategy column format: device strategy/user strategy/device group strategy, or "-" for the default strategy.

Here is an example of the dialog box that appears when you click `Edit Devices` on the "demo1" menu. In this example, the device "1981241962" is applied to the "demo3" strategy; The device "1279471875" is applied to the "demo2" strategy; The device "a123456" is applied to the "demo1" strategy; The device "1227624460" is applied to the default strategy.
.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Edit Users

When you click the `Edit Users` menu, an editing dialog box  displaying all the users will open. You can change the selection status of the checkboxes and then click the `Save` button to apply the user changes made on the current page. If you need to modify users on other pages, please navigate to those pages. You can also use the drop-down menu in the upper right corner to filter users.

Here is an example of the dialog box that appears when you click `Edit Users` on the "demo2" menu. In this example, the user "admin" is applied to the "default" strategy; The user "user1" is applied to the "demo2" strategy; The user "user2" is applied to the "demo3" strategy.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Edit Device Groups

When you click the `Edit Device Group` menu, an editing dialog box displaying all the device groups will open. You can change the selection status of the checkboxes and then click the `Save` button to apply the device group changes made on the current page. If you need to modify device groups on other pages, please navigate to those pages. You can also use the drop-down menu in the upper right corner to filter device groups.

Here is an example of the dialog box that appears when you click `Edit Device Group` on the "demo1" menu. In this example, the device group "device_group1" is applied to the "demo1" strategy; The device group "group2" is applied to the "demo2" strategy; The device group "group3" is applied to the "default" strategy.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Strategy Synchronization

Each device can only be managed by one strategy, and if that strategy is disabled, the device will not be managed by any strategy. When synchronizing strategies, RustDesk records the local and server strategy timestamps to determine whether synchronization is necessary. That is, after strategy synchronization is complete:

* If the user changes some options, the client will use the user's options.
* If the administrator changes the strategy content, the client's options will be synchronized.
* If the administrator changes the strategy to which the device belongs, the client's options will be synchronized.

## Edit Strategies

At the bottom of the strategy, click `Edit`, make modifications and click `Submit`. The strategy will be synchronized to devices within 30 seconds.

