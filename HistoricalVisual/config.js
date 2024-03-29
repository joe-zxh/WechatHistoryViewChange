﻿const config = {
  // 数据源的编码方式。
  // 默认为GBK,按需可修改为UTF-8等。
  // 如果输入的数据是用Excel编写的csv文件，那么大概率应该使用GBK。
  // encoding: "UTF-8",
  encoding: "GBK",

  // 每个时间节点最多显示的条目数。
  max_number: 20,

  // 控制是否显示顶部附加信息文字。
  showMessage: true,

  // !!!请确保打开此项时，使用的是标准日期格式！!!(即：YYYY-MM-DD HH:MM)
  // 时间自动排序。
  // 如果关闭，排序顺序为csv表格的时间字段自上而下的出现顺序。
  // 如果你的日期格式为标准的日期格式，则可以无视数据排序，达到自动按照日期顺序排序的效果。
  // 开启auto_sort可以实现时间的自动补间。
  auto_sort: true,
  timeFormat : "%Y-%m-%d",

  // 倒序，使得最短的条位于最上方
  reverse: false,

  // 类型根据什么字段区分？如果是name，则关闭类型显示
  divide_by: 'name',

  // 颜色根据什么字段区分？
  divide_color_by: 'type',

  // 字段的值与其对应的颜色值
  color: {
    '0':'#39C5BB',
    '1':'#006666',
    '2':'#66CCFF',
    '3':'#EB0000',
    '4':'#009714',
    '5':'#b11111',
    '6':'#e24000',
    '7':'#8605d1',
    '8':'#00a5bb',
    '9':'#c21178',
    '10':'#00a048',
    '11':'#ffc012',
    '12':'#f39303',
    '13':'#933dda',
    '14':'#c0620b',
    '15':'#ee5677',
    '16':'#787878',
    '17':'#CB1B45',
    '18':'#0775be',
    '19':'#B49D33',
    '20':'#1B813E',
    '21':'#DD3287',
    '22':'#00AF89',
    '23':'#0F2540',
    '24':'#2EA9DF',
    '25':'#0A83E6',
    '26':'#cf9237',
  },

  // 颜色绑定增长率
  changeable_color: false,

  // 附加信息内容。
  itemLabel: "当前对话冠军: ",
  typeLabel: "对话次数: ",
  // 榜首项目信息的水平位置 。
  item_x: 400,
  
  // 时间点间隔时间。
  interval_time: 0.4,
  
  // 上方文字水平高度。
  text_y: -50,

  // 右侧文字横坐标
  text_x: 1000,
  // 偏移量
  offset: 300,

  // 长度小于display_barInfo的bar将不显示barInfo。
  display_barInfo: 300,

  // 使用计数器
  // 注意！使用计时器和使用类型目前不能兼容，即不能同时开启！
  // 计数器会出现在右上角，记录着当前榜首的持续时间。
  use_counter: false,
  // 每个时间节点对于计数器的步长。
  // 比如时间节点日期的间隔可能为1周（七天），那么step的值就应该为7。     
  step: 7,

  // 格式化数值
  // 这里控制着数值的显示位数。主要靠修改中间的数字完成，如果为1则为保留一位小数。
  format: ".0f",

  // 图表左右上下间距。
  left_margin: 235,
  right_margin: 150,
  top_margin: 180,
  bottom_margin: 0,

  // 时间标签坐标。
  dateLabel_x: 1440,
  dateLabel_y: 750,

  // 允许大于平均值的条消失时上浮。
  allow_up: false,

  // 设置动画效果，如果为true，则新进入的条目从0开始。
  enter_from_0: false,

  // 如果所有数字都很大，导致拉不开差距则开启此项使得坐标原点变换为（最小值）*2-（最大值）
  big_value: false,

  // 如果要使用半对数坐标，则开启此项
  use_semilogarithmic_coordinate: false,

  // barinfo太长？也许可以试试这个
  long: false,

  // 延迟多少个时间节点开始
  wait:5,

  // 单独控制交换动画速度倍率
  update_rate:1,

  // 开启匀速动画效果
  // animation:'linear',
};
