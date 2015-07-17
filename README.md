# select-roulette
JQuery plugin makes 'ios-like' selects

## Demo
http://jsfiddle.net/rockingelevator/o09pf93c/3/

## Usage

HTML

`<input id="hourPicker" type="text" value="11">`


JS (jQuery required)

```
var hours = [];
for(i=1; i < 25; i++){
	hours.push(i);
}
```
`$('#hourPicker').selectRoulette({data: hours});`



