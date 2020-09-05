Remove-Item -r build
Set-Location ../bloglist-ui
npm run build --prod
Copy-Item -r build ../bloglist
Set-Location ../bloglist