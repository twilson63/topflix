const url = 'https://movie-search.jrs.camp/'
const JWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqcnMuY2FtcCIsImlhdCI6MTQ5ODg2OTM0MiwiZXhwIjoxNTkzNTYzNzQyLCJhdWQiOiJtdXNpYy1zZWFyY2guanJzLmNhbXAiLCJzdWIiOiIxMjM0In0.XtmiG7OD3pGdS748IC4CRJp_qUa7A_JvtNu2G_GcIP8'
import fetch from 'isomorphic-fetch'
export const search = query =>
  fetch(`${url}/q=${query}`, {
    authorization: 'Bearer ' + JWT
  }).then(res => res.json())
