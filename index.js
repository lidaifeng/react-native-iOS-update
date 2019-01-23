/*
 * A smart AMap location Library for react-native apps
 * https://github.com/react-native-component/react-native-smart-amap-location/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import {Platform,Linking} from 'react-native'

function handlerVersionString(version): number {
    version = version.replace('.', '');
    return parseInt(version);
}

/**
 * IOS更新检测
 * @param appId   appstore的应用id
 * @param version  本地版本
 * @returns {Promise<*>}
 */
export async function checkUpdate(appId, version) {
    if (Platform.OS === 'android') {
        console.warn('仅限ios调用')
        return;
    }
    try {
        const response = await fetch(`https://itunes.apple.com/cn/lookup?id=${appId}`);
        const res = await response.json();
        if (res.results.length < 1) {
            return {
                code: -1,
                msg: '此APP为未上架或者查询不到'
            };
        }
        const msg = res.results[0];
        if (handlerVersionString(version) < handlerVersionString(msg.version)) {
            return {
                code: 1,
                msg: msg.releaseNotes,
                version: msg.version
            };
        } else {
            return {
                code: 0,
                msg: '没有新版'
            };
        }
    } catch (e) {
        return {
            code: -1,
            msg: '你可能没有连接网络哦'
        };
    }
}

/**
 * 根据appid打开苹果商店
 * @param appid
 */
export const openAPPStore = (appid) => {
    if (Platform.OS === 'ios') {
        Linking.openURL(`https://itunes.apple.com/us/app/id${appid}?ls=1&mt=8`)
    } else {
        console.warn('仅限ios调用')
    }
};
