#!/usr/bin/php
<?php
    const TILE_WIDTH = 32;
    const TILE_HEIGHT = 32;
    const TILE_SHEET = __DIR__ . '/../asset/image/map/world.png';
    const TILE_DATA = [
        '%' => ['x' => 0, 'y' => 13, 'type' => 1],# Water deep.
        '~' => ['x' => 0, 'y' => 9, 'type' => 1],# Water normal.
        '@' => ['x' => 1, 'y' => 9, 'type' => 2],# Water shallow.
        '.' => ['x' => 2, 'y' => 10, 'type' => 1],# Water shore north.
        ';' => ['x' => 3, 'y' => 10, 'type' => 1],# Water shore east.
        '-' => ['x' => 3, 'y' => 11, 'type' => 1],# Water shore south.
        ':' => ['x' => 2, 'y' => 11, 'type' => 1],# Water shore west.
        '}' => ['x' => 1, 'y' => 10, 'type' => 1],# Water shore north east.
        '{' => ['x' => 0, 'y' => 10, 'type' => 1],# Water shore north west.
        '/' => ['x' => 1, 'y' => 11, 'type' => 1],# Water shore south east.
        '\\' => ['x' => 0, 'y' => 11, 'type' => 1],# Water shore south west.
        'H' => ['x' => 3, 'y' => 9, 'type' => 1],# Water canal up.
        '=' => ['x' => 2, 'y' => 9, 'type' => 1],# Water canal right.
        '>' => ['x' => 1, 'y' => 12, 'type' => 1],# Water arrow left.
        '<' => ['x' => 0, 'y' => 12, 'type' => 1],# Water arrow right.
        'n' => ['x' => 2, 'y' => 12, 'type' => 1],# Water arrow up.
        'u' => ['x' => 3, 'y' => 12, 'type' => 1],# Water arrow down.
        ' ' => ['x' => 0, 'y' => 0, 'type' => 0],# Land normal.
        'G' => ['x' => 0, 'y' => 0, 'type' => 0, 'trigger' => 'gate'],# Land normal.
        '"' => ['x' => 2, 'y' => 1, 'type' => 0],# Land shore north.
        '|' => ['x' => 3, 'y' => 1, 'type' => 0],# Land shore east.
        ',' => ['x' => 3, 'y' => 2, 'type' => 0],# Land shore south.
        '1' => ['x' => 2, 'y' => 2, 'type' => 0],# Land shore west.
        '0' => ['x' => 0, 'y' => 1, 'type' => 0],# Land shore north west.
        '7' => ['x' => 1, 'y' => 1, 'type' => 0],# Land shore north east.
        'J' => ['x' => 1, 'y' => 2, 'type' => 0],# Land shore south east.
        'L' => ['x' => 0, 'y' => 2, 'type' => 0],# Land shore south west.
        '[' => ['x' => 0, 'y' => 5, 'type' => 0],# Land arrow east.
        ']' => ['x' => 1, 'y' => 5, 'type' => 0],# Land arrow west.
        'C' => ['x' => 2, 'y' => 0, 'type' => 0],# Brush arrow north.
        'c' => ['x' => 3, 'y' => 0, 'type' => 0],# Brush arrow south.
        '#' => ['x' => 2, 'y' => 5, 'type' => 0],# Forest.
        '*' => ['x' => 1, 'y' => 0, 'type' => 0],# Brush.
        '8' => ['x' => 2, 'y' => 3, 'type' => 0],# Brush shore north.
        '3' => ['x' => 3, 'y' => 3, 'type' => 0],# Brush shore east.
        'o' => ['x' => 3, 'y' => 4, 'type' => 0],# Brush shore south.
        'E' => ['x' => 2, 'y' => 4, 'type' => 0],# Brush shore west.
        'F' => ['x' => 0, 'y' => 3, 'type' => 0],# Brush shore north west.
        '?' => ['x' => 1, 'y' => 3, 'type' => 0],# Brush shore north east.
        'j' => ['x' => 1, 'y' => 4, 'type' => 0],# Brush shore south east.
        't' => ['x' => 0, 'y' => 4, 'type' => 0],# Brush shore south west.
        'X' => ['x' => 3, 'y' => 5, 'type' => 0],# Rough.
        'Y' => ['x' => 2, 'y' => 7, 'type' => 0],# Rough shore north.
        'i' => ['x' => 3, 'y' => 7, 'type' => 0],# Rough shore east.
        'z' => ['x' => 3, 'y' => 8, 'type' => 0],# Rough shore south.
        'K' => ['x' => 2, 'y' => 8, 'type' => 0],# Rough shore west.
        'R' => ['x' => 0, 'y' => 7, 'type' => 0],# Rough shore north west.
        'q' => ['x' => 1, 'y' => 7, 'type' => 0],# Rough shore north east.
        'g' => ['x' => 1, 'y' => 8, 'type' => 0],# Rough shore south east.
        'h' => ['x' => 0, 'y' => 8, 'type' => 0],# Rough shore south west.
        's' => ['x' => 3, 'y' => 6, 'type' => 0],# Rough arrow east.
        '+' => ['x' => 2, 'y' => 6, 'type' => 0],# Rough arrow west.
        '^' => ['x' => 0, 'y' => 6, 'type' => 2],# Mountain.
        'N' => ['x' => 1, 'y' => 6, 'type' => 2],# Mountain small.
        'x' => ['x' => 1, 'y' => 13, 'type' => 0, 'trigger' => 'effect.poison'],# Poison.
        'f' => ['x' => 2, 'y' => 13, 'type' => 0, 'trigger' => 'effect.lava'],# Lava.
        'V' => ['x' => 3, 'y' => 13, 'type' => 0, 'trigger' => 'effect.lava'],# Volcano.
        'T' => ['x' => 1, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'],# Town.
        'D' => ['x' => 0, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'],# Dungeon.
        'b' => ['x' => 2, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'],# Castle north west.
        'd' => ['x' => 3, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'],# Castle north east.
        'P' => ['x' => 2, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'],# Castle south west.
        'Q' => ['x' => 3, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'],# Castle south east.
        'B' => ['x' => 0, 'y' => 14, 'type' => 0],# Bridge.
        '$' => ['x' => 1, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'] # Shrine.
    ];

    $tiles = [];
    foreach (TILE_DATA as $tile => $data) {
        $image = imagecreatefrompng(realpath(TILE_SHEET));
        $tiles[$tile] = imagecrop($image, [
            'x' => $data['x'] * TILE_WIDTH,
            'y' => $data['y'] * TILE_HEIGHT,
            'width' => TILE_WIDTH,
            'height' => TILE_HEIGHT,
        ]);
        imagedestroy($image);
    }
    unset($title, $data, $image);

    $worldMapData = file_get_contents(realpath(__DIR__ . '/../data/worldMap.cove'));
    $matrix = array_map(function ($row) {
        return str_split(trim($row), 1);
    }, explode(PHP_EOL, $worldMapData));
    $rowCount = count($matrix);
    $columnCount = count($matrix[0]);

    $worldMapImage = imagecreatetruecolor($rowCount * TILE_WIDTH, $columnCount * TILE_HEIGHT);
    foreach ($matrix as $x => $row) {
        foreach ($row as $y => $column) {
            $positionX = $x * TILE_WIDTH;
            $positionY = $y * TILE_HEIGHT;
            if (!imagecopy($worldMapImage, $tiles[$column], $positionY, $positionX, 0, 0, TILE_WIDTH, TILE_HEIGHT)) {
                var_dump('hi', $column, $tiles[$column], 'bye');
                exit;
            }
        }
    }

    imagepng($worldMapImage, __DIR__ . '/../build/worldMap.png');
    foreach ($tiles as $tile) {
        imagedestroy($tile);
    }
    imagedestroy($worldMapImage);
