/**
 * @author TomSawyer2
 * @date 2021/10/22
 *
 * @brief
 * 个人空间有关的接口
 * 1. 获取code的时间
 */
import jsonp from 'jsonp'

 /**
  * @description 获取code的时间
  * @method GET
  */ 
export function getCodingTime() {
    jsonp('https://wakatime.com/share/@080678ef-f627-4d0e-9308-3c75228698b2/d887d3db-cb31-4c53-92ae-67e96a9e9ce8.json', null, (err, data) => {
        if (err) {
            return err.message;
        } else {
            return data.data;
        }
    })
}

