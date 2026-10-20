( function() {
    const VERSIONS = [
        { id: "v2", title: "Clickable field", note: "Words click to zoom · faded backdrop · heading fade-in", path: "v2/" },
        { id: "v1", title: "Original", note: "ASCII pipeline brand page", path: "v1/" }
    ];
    const base = document.currentScript.src;
    const host = document.getElementById( "versions" );
    if ( !host ) return;
    const current = host.dataset.current;

    const style = document.createElement( "style" );
    style.textContent = [
        "#versions { display: inline-block; position: relative; }",
        "#versions .ver-btn { color: var( --muted ); font-size: 10px; font-weight: 500; letter-spacing: 0.5em; text-transform: uppercase; transition: color 0.3s; }",
        "#versions .ver-btn:hover, #versions.open .ver-btn { color: var( --lit ); }",
        "#versions .ver-menu { background: var( --ground ); border: 1px solid var( --hairline ); display: none; min-width: 300px; position: absolute; right: 0; top: calc( 100% + 14px ); z-index: 10; }",
        "#versions.open .ver-menu { display: block; }",
        "#versions .ver-head { border-bottom: 1px solid var( --hairline ); color: var( --muted ); font-size: 10px; letter-spacing: 0.5em; padding: 10px 14px; text-transform: uppercase; }",
        "#versions a { border-bottom: 1px solid var( --hairline ); color: var( --text ); display: block; padding: 10px 14px; text-decoration: none; }",
        "#versions a:last-child { border-bottom: 0; }",
        "#versions a:hover { background: var( --panel ); }",
        "#versions a b { font-weight: 500; letter-spacing: 0.2em; margin-right: 10px; }",
        "#versions a.cur b { color: var( --lit ); }",
        "#versions a.cur b::after { content: \" ■\"; }",
        "#versions a span { color: var( --secondary ); display: block; font-size: 11px; margin-top: 2px; }"
    ].join( "\n" );
    document.head.appendChild( style );

    const btn = document.createElement( "button" );
    btn.className = "ver-btn";
    btn.setAttribute( "aria-haspopup", "true" );
    btn.setAttribute( "aria-label", "Version history" );
    btn.textContent = current + " ▾";

    const menu = document.createElement( "div" );
    menu.className = "ver-menu";
    const head = document.createElement( "div" );
    head.className = "ver-head";
    head.textContent = "Iterations";
    menu.appendChild( head );
    VERSIONS.forEach( function( v ) {
        const a = document.createElement( "a" );
        a.href = new URL( v.path, base ).href;
        if ( v.id === current ) a.className = "cur";
        const b = document.createElement( "b" );
        b.textContent = v.id + " · " + v.title;
        const s = document.createElement( "span" );
        s.textContent = v.note;
        a.appendChild( b );
        a.appendChild( s );
        menu.appendChild( a );
    } );

    host.appendChild( btn );
    host.appendChild( menu );

    btn.addEventListener( "click", function( e ) {
        e.stopPropagation();
        host.classList.toggle( "open" );
    } );
    document.addEventListener( "click", function() { host.classList.remove( "open" ); } );
    document.addEventListener( "keydown", function( e ) {
        if ( e.key === "Escape" ) host.classList.remove( "open" );
    } );
} )();
