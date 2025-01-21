# 25/01 Update
- angular12 -> angular19 변경
- 빌드 에러 ngModule standalone 이슈로 각 모듈에 선언된 component standalone : false값 추가함

[jquery로 margin-left 주기]](https://kamang-it.tistory.com/entry/css%EC%A7%80%EC%98%A5%EC%97%90%EC%84%9C-%ED%83%88%EC%B6%9C%ED%95%98%EC%9E%905-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8%EB%A5%BC-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%9E%8Ddrag-and-drop%EC%9C%BC%EB%A1%9C-%EC%9E%90%EC%9C%A0%EB%A1%AD%EA%B2%8C-%EC%98%AE%EA%B8%B4%EB%8B%A4%EA%B3%A0)

[ag grid로 excel image 넣기](https://ag-grid.com/angular-data-grid/excel-export-images/)
[자바스크립트-image-data를-Excel로-내보내기-featexceljs](https://all-dev-kang.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-image-data%EB%A5%BC-Excel%EB%A1%9C-%EB%82%B4%EB%B3%B4%EB%82%B4%EA%B8%B0-featexceljs)

[Getting Lat/Lng from a Click Event](https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng?hl=en#maps_event_click_latlng-typescript)

---
# jsPDF
- 참조 [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

## install
```
npm install jspdf jspdf-autotable
```
# Usage
```
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>
doc.autoTable({ html: '#my-table' })

// Or use javascript directly:
doc.autoTable({
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ],
})

doc.save('table.pdf')
```
#  Options
Below is a list of all options supported in the plugin. All of them are used in the examples.

## Content options
The only thing required is either the html or body option. If you want more control over the columns you can specify the columns property. If columns are not set they will be automatically computed based on the content of the html content or head, body and foot.

- html: string|HTMLTableElement A css selector (for example "#table") or an html table element.
- head: CellDef[][] For example [['ID', 'Name', 'Country']]
- body: CellDef[][] For example [['1', 'Simon', 'Sweden'], ['2', 'Karl', 'Norway']]
- foot: CellDef[][] For example [['ID', 'Name', 'Country']]
- columns: ColumnDef[] For example [{header: 'ID', dataKey: 'id'}, {header: 'Name', dataKey: 'name'}]. Only use this option if you want more control over the columns. If not specified the columns will be automatically generated based on the content in html or head/body/foot
- includeHiddenHtml: boolean = false If hidden html with display: none should be included or not when the content comes from an html table
CellDef: string|{content: string, rowSpan: number, colSpan: number, styles: StyleDef} Note that cell styles can also be set dynamically with hooks.

ColumnDef: string|{header?: string, dataKey: string} The header property is optional and the values of any content in head will be used if not set. Normally it's easier to use the html or head/body/foot style of initiating a table, but columns can be useful if your body content comes directly from an api or if you would like to specify a dataKey on each column to make it more readable to style specific columns in the hooks or columnStyles.

Usage with colspan, rowspan and inline cell styles:
```
doc.autoTable({
  body: [
    [{ content: 'Text', colSpan: 2, rowSpan: 2, styles: { halign: 'center' } }],
  ],
})
```
### Styling options
- theme: 'striped'|'grid'|'plain'|'css' = 'striped'
- styles: StyleDef
- headStyles: StyleDef
- bodyStyles: StyleDef
- footStyles: StyleDef
- alternateRowStyles: StyleDef
- columnStyles: {&columnDataKey: StyleDef} Note that the columnDataKey is normally the index of the column, but could also be the dataKey of a column if content initialized with the columns property

StyleDef:

- font: 'helvetica'|'times'|'courier' = 'helvetica'
- fontStyle: 'normal'|'bold'|'italic'|'bolditalic' = 'normal'
- overflow: 'linebreak'|'ellipsize'|'visible'|'hidden' = 'linebreak'
- fillColor: Color? = null
- textColor: Color? = 20
- cellWidth: 'auto'|'wrap'|number = 'auto'
- minCellWidth: number? = 10
- minCellHeight: number = 0
- halign: 'left'|'center'|'right' = 'left'
- valign: 'top'|'middle'|'bottom' = 'top'
- fontSize: number = 10
- cellPadding: Padding = 10
- lineColor: Color = 10
- lineWidth: number = 0 // If 0, no border is drawn

Color: Either false for transparent, hex string, gray level 0-255 or rbg array e.g. [255, 0, 0] false|string|number|[number, number, number]

Padding: Either a number or object {top: number, right: number, bottom: number, left: number}

Styles work similar to css and can be overridden by more specific styles. Overriding order:

1. Theme styles
2. styles
3. headStyles, bodyStyles and footStyles
4. alternateRowStyles
5. columnStyles

Styles for specific cells can also be applied using either the hooks (see hooks section above) or the styles property on the cell definition object (see content section above).

Example usage of column styles (note that the 0 in the columnStyles below should be dataKey if columns option used)
```
// Example usage with columnStyles,
doc.autoTable({
  styles: { fillColor: [255, 0, 0] },
  columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
  margin: { top: 10 },
  body: [
    ['Sweden', 'Japan', 'Canada'],
    ['Norway', 'China', 'USA'],
    ['Denmark', 'China', 'Mexico'],
  ],
})

// Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
doc.autoTable({
  columnStyles: { europe: { halign: 'center' } }, // European countries centered
  body: [
    { europe: 'Sweden', america: 'Canada', asia: 'China' },
    { europe: 'Norway', america: 'Mexico', asia: 'Japan' },
  ],
  columns: [
    { header: 'Europe', dataKey: 'europe' },
    { header: 'Asia', dataKey: 'asia' },
  ],
})
```
### Other options
- startY: number = null Where the table should start to be printed (basically a margin top value only for the first page)
- margin: Margin = 40
- pageBreak: 'auto'|'avoid'|'always' If set to avoid the plugin will only split a table onto multiple pages if table height is larger than page height.
- rowPageBreak: 'auto'|'avoid' = 'auto' If set to avoid the plugin will only split a row onto multiple pages if row height is larger than page height.
- tableWidth: 'auto'|'wrap'|number = 'auto'
- showHead: 'everyPage'|'firstPage'|'never' = 'everyPage''
- showFoot: 'everyPage'|'lastPage'|'never' = 'everyPage''
- tableLineWidth: number = 0
- tableLineColor: Color = 200 The table line/border color
- horizontalPageBreak: boolean = true To split/break the table into multiple pages if the given table width exceeds the page width
- horizontalPageBreakRepeat: string | number = 'id' To repeat the given column in the split pages, works when horizontalPageBreak = true. The accepted values are column data keys, such as 'id', recordId or column indexes, such as 0, 1.
- Margin: Either a number or object {top: number, right: number, bottom: number, left: number}

### Hooks
You can customize the content and styling of the table by using the hooks. See the custom styles example for usage of the hooks.

- didParseCell: (HookData) => {} - Called when the plugin finished parsing cell content. Can be used to override content or styles for a specific cell.
- willDrawCell: (HookData) => {} - Called before a cell or row is drawn. Can be used to call native jspdf styling functions such as doc.setTextColor or change position of text etc before it is drawn.
- didDrawCell: (HookData) => {} - Called after a cell has been added to the page. Can be used to draw additional cell content such as images with doc.addImage, additional text with doc.addText or other jspdf shapes.
- didDrawPage: (HookData) => {} - Called after the plugin has finished drawing everything on a page. Can be used to add headers and footers with page numbers or any other content that you want on each page there is an autotable.
All hooks functions get passed an HookData object with information about the state of the table and cell. For example the position on the page, which page it is on etc.

HookData:

- table: Table
- pageNumber: number The page number specific to this table
- settings: object Parsed user supplied options
- doc The jsPDF document instance of this table
- cursor: { x: number, y: number } To draw each table this plugin keeps a cursor state where the next cell/row should be drawn. You can assign new values to this cursor to dynamically change how the cells and rows are drawn.


For cell hooks these properties are also passed:
- cell: Cell
- row: Row
- column: Column
- section: 'head'|'body'|'foot'
To see what is included in the Table, Row, Column and Cell types, either log them to the console or take a look at src/models.ts

```
// Example with an image drawn in each cell in the first column
doc.autoTable({
  didDrawCell: (data) => {
    if (data.section === 'body' && data.column.index === 0) {
      var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
      doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10)
    }
  },
})
```


## websocket
- https://www.youtube.com/watch?v=8CNVYWiR5fg&t=81s
- https://www.youtube.com/watch?v=YVMSOM9aDz0