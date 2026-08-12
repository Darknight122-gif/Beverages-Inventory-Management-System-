const pool = require('../config/db');

// GET /api/beverages
exports.getAllBeverages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM beverages ORDER BY id DESC');
    res.status(200).json({ count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.', details: err.message });
  }
};

// GET /api/beverages/:id
exports.getBeverageById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM beverages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Beverage not found.' });
    }
    res.status(200).json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error.', details: err.message });
  }
};

// POST /api/beverages
exports.createBeverage = async (req, res) => {
  const { name, category, quantity, price, supplier } = req.body;

  if (!name || !category || quantity === undefined || price === undefined) {
    return res.status(400).json({
      error: '"name", "category", "quantity" and "price" are required.'
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO beverages (name, category, quantity, price, supplier) VALUES (?, ?, ?, ?, ?)',
      [name, category, quantity, price, supplier || null]
    );

    res.status(201).json({
      message: 'Beverage added successfully.',
      data: { id: result.insertId, name, category, quantity, price, supplier: supplier || null }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.', details: err.message });
  }
};

// PUT /api/beverages/:id
exports.updateBeverage = async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, supplier } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM beverages WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Beverage not found.' });
    }

    const current = existing[0];

    await pool.query(
      'UPDATE beverages SET name = ?, category = ?, quantity = ?, price = ?, supplier = ? WHERE id = ?',
      [
        name ?? current.name,
        category ?? current.category,
        quantity ?? current.quantity,
        price ?? current.price,
        supplier ?? current.supplier,
        id
      ]
    );

    res.status(200).json({ message: 'Beverage updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.', details: err.message });
  }
};

// DELETE /api/beverages/:id
exports.deleteBeverage = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM beverages WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Beverage not found.' });
    }
    res.status(200).json({ message: 'Beverage deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.', details: err.message });
  }
};
