const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { orderNumber, customerName, address, city, state,  postalCode, country, weight, dimensions} = req.body;

        const existingOrder = await Order.findOne({orderNumber});
        if (existingOrder){
            return res.status(400).json({
                error : '주문번호가 이미 존재합니다'
            });
        }

        const newOrder = new Order({
            orderNumber,
            customerName,
            address, 
            city, 
            postalCode, 
            country, 
            weight, 
            state,
            dimensions,
            status: 'pending'
        })

        await newOrder.save();
        res.status(201).json({ message: '주문이 성공적으로 저장되었습니다.', data : newOrder});
    }catch (error){
        console.error('주문 저장 오류:', error);
        res.status(500).json({error: '서버 오류'});
    }
});

router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error('🚨 주문 조회 오류:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  });
  
  module.exports = router;