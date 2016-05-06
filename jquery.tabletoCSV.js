jQuery.fn.tableToCSV = function() {
    
    var clean_text = function(text){
        text = text.replace(/"/g, '""');
        return '"'+text+'"';
    },
    ieVersion = function() {
        var navStr = navigator.userAgent.toLowerCase();
        return -1 != navStr.indexOf("msie") ? parseInt(navStr.split("msie")[1]) : null
    };
    
	$(this).each(function(){
			var table = $(this);
			var caption = $(this).find('caption').text();
			var title = [];
			var rows = [];

			$(this).find('tr').each(function(){
				var data = [];
				$(this).find('th').each(function(){
                    var text = clean_text($(this).text());
					title.push(text);
					});
				$(this).find('td').each(function(){
                    var text = clean_text($(this).text());
					data.push(text);
					});
				data = data.join(",");
				rows.push(data);
				});
			title = title.join(",");
			rows = rows.join("\n");

			var csv = title + rows;
			var ts = new Date().getTime();
		        var fileName = caption ? caption + "-" + ts + ".csv" : ts + ".csv",
		        var ieVer = ieVersion();

		        if (ieVer && 10 > ieVer) {
			   var frame = document.createElement("iframe");
			   document.body.appendChild(frame);
			   frame.contentWindow.document.open("text/html", "replace");
			   frame.contentWindow.document.write("sep=,\r\n" + csv);
			   frame.contentWindow.document.close();
			   frame.contentWindow.focus();
			   frame.contentWindow.document.execCommand("SaveAs", !0, fileName);
			   document.body.removeChild(frame);
		        } else if (navigator.msSaveBlob) {
			   navigator.msSaveBlob(new Blob([csv], {type: "text/csv;charset=utf-8;"}), fileName);
		        } else {
			   var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
			   var download_link = document.createElement('a');
			   download_link.href = uri;
			   download_link.download = fileName;
			   document.body.appendChild(download_link);
			   download_link.click();
			   document.body.removeChild(download_link);
		        }

	});
    
};
