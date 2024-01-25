import XLSX from "xlsx-js-style";

export function exportData(data, filename) {
  var ws = XLSX.utils.json_to_sheet(data);

  // TODO: check the author details to be sent if required
  // wb.Props = {
  //   Title: "SheetJS Test",
  //   Subject: "Tests",
  //   Author: "Devs at SheetJS",
  //   Manager: "Sheet Manager",
  //   Company: "SheetJS",
  //   Category: "Experimentation",
  //   Keywords: "Test",
  //   Comments: "Nothing to say here",
  //   LastAuthor: "Not SheetJS",
  //   CreatedDate: new Date(2017,1,19)
  // };

  // applying default width to every column
  var wscols = Object.keys(data[0]).map((e) => ({ wch: 25 }));
  ws["!cols"] = wscols;

  // NOTE: Refer:
  // https://docs.sheetjs.com/docs/getting-started/example/
  // https://gitbrent.github.io/xlsx-js-style/
  // https://github.com/protobi/js-xlsx  //This contains the list of properties
  var cellSheetIndexes = Object.keys(ws); // All Keys of WS (array of strings)
  [...new Set(cellSheetIndexes.map((item) => item.replace(/\d+/g, "1")))] // all cell names of first row(array of strings)
    .filter((i) => !["!ref", "!cols"].includes(i)) // removing garbage values
    .forEach((element) => {
      // applying styles to each column of first row
      ws[element].s = {
        font: {
          bold: true,
          sz: "12",
        },
      };
    });

  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, filename.split(".")[0]);
  XLSX.writeFile(wb, filename);
}
