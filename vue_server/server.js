const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
// 自定义文件存储路径和文件名处理函数
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const date = new Date();
      const year = String(date.getFullYear()); // 确保为字符串
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
      const day = String(date.getDate()).padStart(2, '0'); // 补零
      const uploadPath = path.join(__dirname, 'uploads', year, month, day);

      // 创建目录
      require('fs').mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath); // 返回路径字符串
    } catch (error) {
      console.error('创建上传路径失败:', error);
      cb(error); // 如果失败，返回错误
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname); // 确保使用正确的字段
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});
// 配置创建 multer 实例
const upload = multer({ storage });

// 配置CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// 处理图片上传的静态文件服务，调整路径以适配新的存储结构
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 解析前端发送的表单数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 图片上传接口
app.post('/upload-image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('没有文件上传');
  }

  // 根据新的存储结构构建图片 URL
  const relativePath = path.relative(path.join(__dirname, 'uploads'), req.file.path);
  const imageUrl = `http://localhost:3000/uploads/${relativePath}`;
  res.json({ imageUrl });
});
// 添加菜品接口
app.post('/add-dish', express.json(), (req, res) => {
  const { name, price, stock, image } = req.body; // 获取菜品数据

  // 检查数据是否完整
  if (!name ||!price ||!stock ||!image) {
    return res.status(400).json({ error: '缺少必要的菜品信息' });
  }

  console.log('接收到的菜品:', { name, price, stock, image });

  // 返回成功信息
  res.json({
    message: '菜品上架成功',
    dish: { name, price, stock, image }
  });
});

// 假数据：模拟菜品和购物车，没有数据库
let orders = []; // 用于存储所有的订单

// 支付接口（模拟）
app.post('/payment', (req, res) => {
  const { tableNumber, totalPrice, cart } = req.body;

  if (totalPrice > 0) {
    // 创建新的订单
    const newOrder = {
      tableNo: tableNumber,
      totalPrice,
      status: '支付成功',
      time: new Date().toISOString(),
      dishes: cart // 将购物车中的菜品添加到订单中
    };

    console.log('订单信息:', newOrder); // 这里打印订单的详细信息

    // 保存订单（这里只是存储在内存中）
    orders.push(newOrder);

    // 返回支付成功信息以及订单详情
    res.json({
      status: 'success',
      message: '支付成功',
      order: newOrder // 返回包含菜品信息的订单
    });
  } else {
    res.json({ status: 'failure', message: '支付失败' });
  }
});

// 获取历史订单接口
app.get('/orders', (req, res) => {
  res.json(orders); // 返回所有历史订单
});
app.use((err, req, res, next) => {
  console.error('服务器出现错误：', err);
  res.status(500).json({ error: '服务器内部错误，请稍后再试' });
});
app.listen(port, () => {
  console.log(`服务器启动在 http://localhost:${port}`);
});