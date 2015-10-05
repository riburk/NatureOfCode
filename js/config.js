require.config({
    "baseUrl": 'js',
    "paths": {"jquery": 'vendor/jquery-1.10.2.min',
                "box2d": 'vendor/Box2D_v2.2.1_debug.js'},
    shim: {
        'Box2D':{
            exports: 'Box2D'
        }
    }
});