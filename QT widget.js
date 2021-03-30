const source = "http://nh.kccc.org/qt.html";
let wv = new WebView();
wv.loadURL(source);
await wv.waitForLoad();

let crawlCode = `
  let bib = document.querySelector("#tab1Body > h2");
  let bibData = new Array();
  let bibText = bib.innerText.split("\\n")

  bibData.push(bibText[0])
  bibData.push(bibText[1])

  let bibString = JSON.stringify(bibData)
  bibString;
`;

let bibSource = await wv.evaluateJavaScript(crawlCode);
let bibArray = JSON.parse(bibSource);

const main = async () => {
  let widget = new ListWidget();
  widget.backgroundColor = new Color("#333");
  widget.url = source;
  widget.refreshAfterDate = new Date(Date.now() + 1000 * 60 * 60);

  let Stack1 = widget.addStack();
  Stack1.setPadding(5, 10, 5, 5);

  let widgetName = Stack1.addText(" 오늘의 QT");
  widgetName.font = Font.blackMonospacedSystemFont(10);
  widgetName.textColor = Color.white()

  let Stack2 = widget.addStack();
  Stack2.layoutHorizontally();
  Stack2.setPadding(5, 5, 5, 5);

  let bibTitle = Stack2.addText(bibArray[0].toString());
  bibTitle.font = Font.blackMonospacedSystemFont(17);
  bibTitle.centerAlignText();
  bibTitle.textColor = Color.white()

  let Stack3 = widget.addStack();
  Stack3.setPadding(5, 5, 5, 5);

  let bibDest = Stack3.addText(bibArray[1].toString());
  bibDest.font = Font.blackMonospacedSystemFont(14);
  bibDest.textColor = Color.white()

  return widget;
};

console.log(bibSource);
console.log("This is bibTitle : " + bibArray[0].toString());
console.log("This is bibDest : " + bibArray[1].toString());

//Main Start

let widget = await main();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  //for Test
}

Script.complete();
