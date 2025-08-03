{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
<<<<<<< HEAD
      "src": "/(.*)",
      "dest": "index.js"
=======
      "src": "/api/check-status",
      "methods": ["POST"],
      "dest": "api/index.js"
>>>>>>> 93c2d4a (WIP: Lưu tạm thay đổi trước khi rebase)
    }
  ]
}
