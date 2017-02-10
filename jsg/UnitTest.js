if(typeof UnitTest === 'undefined'){
	
	var UnitTestCount = 0;
	
	function UnitTestList(properties){
		var UnitTestCount = ++UnitTestCount;
		
		properties = properties || {};
		var tests = typeof properties.tests !== 'undefined' ? properties.tests : new Array();
		var printToScreen = typeof properties.printToScreen !== 'undefined' ? properties.printToScreen : true;
		var title = typeof properties.title === 'string' ? properties.title : 'Unit Test ' + UnitTestCount;
		var container = typeof properties.container !== 'undefined' ? properties.container : null;
		
		var successfulTests;
		var failedTests;
		var html = "";
		
	
	
		this.Add = function(newTest){
			if(typeof newTest != 'object' || typeof newTest.code != 'function'){
				throw new Error("could not add invalid unit test : " + UnitTest);
			}
			tests.push(newTest);
		}
		
		
		this.Run = function(){
			html = "";
			if(printToScreen){
				html += "<h3>" + title + "</h3><table><thead><tr><td>Test</td><td>Code</td><td>Result</td><td>Pass</td></tr></thead><tbody>";
			}
			successfulTests = 0;
			failedTests = 0;
			var exception;
			var errMessage;
			var test;
			var result;
			for(i in tests){
				test = tests[i];
				if(printToScreen){
					html += "<tr><td></td><td>" + test.code + "</td><td>";
				}
				try{
					result = test.code();
					exception = true;
					errMessage = null;
				}
				catch(err){
					errMessage = err.message;
					exception = false;
				}
				if(exception === test.exception){
					if(printToScreen){
						html += result + "</td><td>True";
					}
					++successfulTests;
				} else {
					if(printToScreen){
						html += (errMessage ? errMessage : result) + "</td><td>False";
					}
					++failedTests;
				}
				if(printToScreen){
					html += "</tr>";
				}
			}
			
			
			if(printToScreen){
				html += "</tbody></table>";
			}
			
			if(printToScreen && container){
				container.innerHTML += html;
			}
		}
		
		
		this.PrintToScreen = function(shouldPrintToScreen){
			printToScreen = shouldPrintToScreen;
		}
	};

	function UnitTest(code,exception){
		this.code = code;
		this.exception = exception;
	}
	
	
}