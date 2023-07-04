---
title: Strategy
weight: 200
---

## Strategy

Strategy is a tool for RustDesk administrators to update the security options of client settings pages in bulk. Administrators can create different strategies and apply them to different devices. RustDesk provides a default strategy, and administrators can create custom strategies.

### Create and Duplicate Strategies

RustDesk provides a default strategy that administrators can modify, or they can create a new strategy or `Duplicate` an existing one. When creating a new strategy, administrators can `Rename`, `Delete`, or `Edit Devices`. When duplicating a strategy, administrators can modify it based on the existing strategy.

|    Default Strategy  | Other Strategies     |
| :--------------: | :------------: |
|  ![](/docs/en/self-host/pro/strategy/images/default_strategy.png)    |  ![](/docs/en/self-host/pro/strategy/images/other_strategy.png)    |

### Enable and Disable Strategies

Administrators can `Enable` or `Disable` different strategies as needed. By default, all devices use the default strategy. If administrators want to use another strategy, they can enable it in the strategy options.

### Managing Devices

Each device can only be managed by one strategy. Administrators can change the management strategy of a device by the `Edit Devices` option. By default, all devices use the default strategy. Administrators can add or delete devices and change their management strategies. If a device is deleted, it will be managed by the default strategy again.

In the device management interface, the left-hand area is used to filter devices, and the devices selected in the right-hand column will be managed by the current strategy. Devices that are not logged in will be displayed in the `-` group.

|  User Group  | Unbinded Devices |
| :--------------: | :------------: |
|  ![](/docs/en/self-host/pro/strategy/images/edit_devices_group.png)    |  ![](/docs/en/self-host/pro/strategy/images/edit_devices_unbinded.png)    |

### Strategy Synchronization

Each device can only be managed by one strategy, and if that strategy is disabled, the device will not be managed by any strategy. When synchronizing strategies, RustDesk records the local and server strategy timestamps to determine whether synchronization is necessary. That is, after strategy synchronization is complete:

* If the user changes some options, the client will use the user's options.
* If the administrator changes the strategy content, the client's options will be synchronized.
* If the administrator changes the strategy to which the device belongs, the client's options will be synchronized.

### Edit Strategies

At the bottom of the strategy, click `Edit`, make modifications and click `Submit`. The strategy will be synchronized to devices within 30 seconds.
