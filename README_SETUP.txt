KOVAI LEGAL ASSOCIATES - FRESH SETUP

FILES IN THIS ZIP
- index.html
- Code.gs
- Appointment_Requests_Template.csv
- README_SETUP.txt

GOOGLE SHEET
1. Create a new blank Google Sheet.
2. Rename the first tab exactly: Appointment Requests
3. Import Appointment_Requests_Template.csv, or copy its first row into A1.
4. Open Extensions -> Apps Script.
5. Delete the default code and paste everything from Code.gs.
6. Save.
7. Select the function setup and click Run ONCE.
8. Complete Google authorization.
9. Deploy -> New deployment -> Web app.
10. Execute as: Me
11. Who has access: Anyone
12. Deploy.
13. Copy the Web app URL ending in /exec.
14. Open the /exec URL directly in a browser. It should say:
    Kovai Legal Associates appointment service is running.

GITHUB
1. Open index.html.
2. Replace YOUR_APPS_SCRIPT_WEB_APP_URL with your real /exec URL.
3. Upload/replace index.html in your GitHub repository.
4. Commit.
5. Hard refresh the live website with Ctrl+Shift+R.
6. Submit one test appointment.
7. Check the Appointment Requests Google Sheet.

IMPORTANT
- Only run setup manually.
- Do NOT run doPost manually.
- Add email notifications only after website -> Google Sheet works.
