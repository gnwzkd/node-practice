用于自定完成提示框，通过 cities.json 查询城市。

url: <https://ass-we-can.herokuapp.com/autoCompleteCity>

参数:

| 键   | 值     | 备注     |
| ---- | ------ | -------- |
| q    | string | 搜索文字 |

返回数据：

```json
[{
    "country": "CN",
    "name": "Wuhu",
    "lat": "31.33728",
    "lng": "118.37351"
}, {
    "country": "CN",
    "name": "Wuhe Chengguanzhen",
    "lat": "33.1386",
    "lng": "117.86582"
}, {
    "country": "CN",
    "name": "Wuhan",
    "lat": "30.58333",
    "lng": "114.26667"
}, {
    "country": "CN",
    "name": "Wuhai",
    "lat": "39.68442",
    "lng": "106.81583"
}, {
    "country": "CN",
    "name": "Wuhu",
    "lat": "31.1463",
    "lng": "118.56465"
}]
```

