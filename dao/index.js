const { Sequelize, DataTypes } = require("sequelize");

// postgres://<USUARIO>:<PASSWORD>@<URL_HOST_BD>:<PUERTO_BD>/<NOMBRE_BD>

const CADENA_CONEXION = process.env.DATABASE_URL ||
    "postgresql://postgres:lO3vhx2Z9LaWDqhNJiOG@containers-us-west-126.railway.app:6792/railway"

const sequelize = new Sequelize(CADENA_CONEXION, {
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false
        }
    }
})

const Reviews = sequelize.define("reviews", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    autor : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    review : {
        type : DataTypes.TEXT,
        allowNull : false
    } 
    ,
    stars : {
        type : DataTypes.INTEGER,
        allowNull : false
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

const Influencers = sequelize.define("influencers", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    reviews : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    influencer : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    gratitude: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    urlvideo: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    urllogo: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    color: {
        type : DataTypes.TEXT,
        allowNull : false
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

const Components = sequelize.define("components", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    img : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    title : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    currency: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    price: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    type: {
        type : DataTypes.TEXT,
        allowNull : false
    },
    isbestseller: {
        type : DataTypes.BOOLEAN,
        allowNull : false
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = {
    Reviews, Influencers, Components
}