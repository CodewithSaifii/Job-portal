const Company = require('../models/CompanySchema');

exports.createCompany = async (req, res) => {
  try {
    const { name, industry, description, website, logo, location } = req.body;

    const newCompany = new Company({
      name,
      industry,
      description,
      website,
      logo,
      location,
      owner: req.user.id // from JWT
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('owner', 'name email');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('owner', 'name email');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
