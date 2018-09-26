function MyExecution(){
//Files("07-08");
//Folder("07-08");
XMLFiles("07-08","ListaXML");
// https://drive.google.com/uc?id=### file id ###&export=download
}

function XMLFiles(folderName,sheetName) {
  // Get folder with XML files and it's content
  var folder = DriveApp.getFoldersByName(folderName).next();
  
  var content = folder.getFiles();
  var content_length = content.length;
  
  //Search for spreadsheet file, open it and activate it
  var ss = DriveApp.getFilesByName(sheetName);
  ss = SpreadsheetApp.open(ss.next());
  SpreadsheetApp.setActiveSpreadsheet(ss);
  
  //var sheet = ss.getActiveSheet();
  var file, data, sheet = ss.getActiveSheet();
  sheet.clear();
  //sheet.appendRow(["Name", "Date", "Size", "URL", "Download", "Description", "Type"]);
  sheet.appendRow(["Download", "XPath", "Value"]);

  var content_length = content.length;
  for (var i = 0; i < content.length; i++) {
    file = content[i];
    if (file.getFileType() == "SPREADSHEET") {
      continue;
    } 
    data = [ 
      //file.getName(),
      //file.getDateCreated(),
      //file.getSize(),
      //file.getUrl(),
      "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=" + file.getId(),
      "//@",
      "=XMLIMPORT(A" + (1+i) + ",B" + (1+i) + ")",
      //file.getDescription(),
      //file.getFileType().toString()
    ];
    sheet.appendRow(data);
  }
};

function Files(folderName) {
  
  var folder = DriveApp.getFoldersByName(folderName).next();
  var contents = folder.getFiles();
  
  var file, data, sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  
  sheet.appendRow(["Name", "Date", "Size", "URL", "Download", "Description", "Type"]);
  
  for (var i = 0; i < contents.length; i++) {
 
    file = contents[i];
    
    if (file.getFileType() == "SPREADSHEET") {
      continue;
    }
        
    data = [ 
      file.getName(),
      file.getDateCreated(),
      file.getSize(),
      file.getUrl(),
      "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=" + file.getId(),
      file.getDescription(),
      file.getFileType().toString()
    ];
    
    sheet.appendRow(data);
  
  }
  
};

// replace your-folder below with the folder for which you want a listing
function Folder(folderName) {
  //var foldername = 'your-folder';
  var folderlisting = 'listing of folder ' + folderName;
  
  var folders = DriveApp.getFoldersByName(folderName)
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.create(folderlisting);
  var sheet = ss.getActiveSheet();
  sheet.appendRow( ['name', 'link'] );
  
  var file;
  var name;
  var link;
  var row;
  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
    link = file.getUrl();
    sheet.appendRow( [name, link] );     
  }  
};

