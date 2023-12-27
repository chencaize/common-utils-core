# common-utils-core

common utils
LogUtils:print logs
DateUtils:useful dateutils

# Installation

```
npm install common-utils-core
#or
yarn add common-utils-core
```

# API

## DateUtils
| function | Description | params | return |
| --- | --- | --- | --- |
| dateFormat | - | moment,string:{default:"-"} | string |
| datetimeFormat | - | moment,string:{default:"-"},string:{default:":"} | string |
| timeFormat | - | moment,string:{default:":"} | string |
| yearFormat | - | moment | string |
| monthDayFormat | - | moment,string:{default:"-"} | string |
| getValidMomentDate | - | moment/string | moment |
| getNow | - | void | moment |
| format | - | moment/string,string | string |
| findTheEffectiveAndEarliiestBetweenRangeDates | - | [string,string,string,...],[string,string] | string |
| getDifferWeeksBetweenTwoDates | - | moment/string,moment/string | number |

## LogUtils
| function | Description | params | return |
| --- | --- | --- | --- |
| setShowLog | - | boolean | void |
| setLogLevel | - | string:{allow:["debug","info","warn","error"]} | void |
| debug | - | array | void |
| info | - | array | void |
| warn | - | array | void |
| error | - | array | void |

# How to use it

``` js
import {DateUtils,LogUtils} from "common-utils-core"; //es
// const {DateUtils,LogUtils} = require("common-utils-core");//commonjs
// const {DateUtils,LogUtils} = window["common-utils-core"];//html

const { DateUtils, LogUtils } = window["common-utils-core"];//html
LogUtils.debug("debug log");
LogUtils.info("info log");
LogUtils.warn("warn log");
LogUtils.error("error log");

LogUtils.debug("----------change level to warn------------");

LogUtils.setLogLevel("warn");//change level to warn
LogUtils.debug("debug log");
LogUtils.info("info log");
LogUtils.warn("warn log");
LogUtils.error("error log");

LogUtils.setLogLevel("debug");
LogUtils.debug("----------hide log------------");

LogUtils.setShowLog(false); //hide log
LogUtils.debug("debug log");
LogUtils.info("info log");
LogUtils.warn("warn log");
LogUtils.error("error log");

LogUtils.setShowLog(true); //hide log
LogUtils.debug(DateUtils.datetimeFormat(DateUtils.getNow()));
```

# update

1.0.0 add DateUtils,LogUtils