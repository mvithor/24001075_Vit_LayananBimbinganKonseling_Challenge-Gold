const beranda = async (req, res) => {
    await res.render('index', {
        layout : 'layouts/main-layout',
        title  : 'Home'
    })
}

const tentang = async (req, res) => {
    await res.render('tentang', {
        layout : 'layouts/main-layout',
        title  : 'Tentang Kami'
    })
}

const layanan = async (req, res) => {
    await res.render('layanan', {
        layout : 'layouts/main-layout',
        title  : 'Layanan' 
    })
}

const konselor = async (req, res) => {
    await res.render('konselor', {
        layout : 'layouts/main-layout',
        title  : 'Konselor'
    })
}

const literasi = async (req, res) => {
    await res.render('literasi', {
        layout : 'layouts/main-layout',
        title  : 'literasi'
    })
}

module.exports = {
    beranda,
    tentang,
    layanan,
    konselor,
    literasi,
}