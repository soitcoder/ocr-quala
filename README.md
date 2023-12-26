This is an **image-to-text extractor** app.<br>
To achieve this, this website uses Google vision.<br>
The output from google vision API is passed through a custom build function.<br>
This Function extracts all the Necessary Information required from the Output, such as:
- Name
- Last Name
- Identification Number
- Date of issue
- Date of expiry
- Date of birth<br>
All this information is displayed in the textarea given below.<br>
The working of the custom function is as follows :
1. It splits the input text into separate lines, filtering out any empty lines or lines with only whitespace.
1. It looks for a line starting with numeric characters, indicating an identification number. If found, it trims the line and assigns it to the identification_number property in the parsedData object.
1. It searches for lines containing 'Name' or 'Last name' keywords. If found, it extracts the text after these keywords and assigns it to the name or last_name properties, respectively, in the parsedData object.
1. It searches for a line starting with 'เกิดวันที่' (Thai characters for 'Date of Birth'). If found, it extracts the text after this keyword and assigns it to the date-of-birth property in the parsedData object.
1. It looks for lines starting with 'วันออกบัตร' (Date of Issue) and 'วันบัตรหมดอายุ' (Date of Expiry). If found, it extracts the text from the next line and assigns it to the date-of-issue or date-of-expiry properties, respectively, in the parsedData object.
<br>
The function essentially scans each line for specific keywords and extracts relevant information based on the positions of these keywords and their subsequent content, populating a data object (parsedData) with the extracted details.<br>
The website is then hosted using render.  The link of the website : [ocr-Quala] (https://ocr-quala-70vy.onrender.com)<br>

