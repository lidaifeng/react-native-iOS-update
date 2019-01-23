
### React Native App  ios跳到APP Store 版本升级封装库

#### iOS
##### （1）版本检测
##### （2）跳转App Store


#### 


##  使用
   ```
 yarn add https://github.com/lidaifeng/react-native-iOS-update
 //then
 react-native link react-native-app-upgrade

import {openAPPStore,checkUpdate} from 'react-native-app-upgrade'

if (Platform.OS === 'ios') {
    checkUpdate('appid','本地版本').then(data=>{
    if(data.code === 1){
    openAPPStore('appid')
    }
  })
}



