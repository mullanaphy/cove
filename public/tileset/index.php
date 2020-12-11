<?php
    $source = isset($_GET['tileset'])
        ? str_replace('/', '', $_GET['tileset'])
        : 'world.0.2';
    $source = 'sources/'.$source;
    if (isset($_GET['_ajax'])):
        header('Content-type: application/json;charset=utf-8');
        header('Content-Encoding: gzip');
        $file = stat($source);
        if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])):
            $modified = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
            if (($modified > 0) && ($modified >= $file['mtime'])):
                header('HTTP/1.0 304 Not Modified');
                header('Expires:');
                header('Cache-Control: public, max-age=86400');
                exit;
            endif;
        endif;
        header('Cache-Control: public, max-age=86400');
        header('Pragma: ');
        header('Last-Modified: '.gmdate('D, d M Y H:i:s', strtotime('- 5 second')).' GMT');
        header('Expires: '.gmdate('D, d M Y H:i:s', strtotime('+ 1 day')).' GMT');
        ob_start();
        ob_start('ob_gzhandler');
    endif;

    if (is_file($source.'.converted')):
        $SOURCE = fopen($source.'.converted', 'r');
        echo fread($SOURCE, filesize($source.'.converted'));
        fclose($SOURCE); else:
        $SOURCE = fopen($source, 'r');
        $rows = fread($SOURCE, filesize($source));
        fclose($SOURCE);

        $rows = explode("\n", $rows);

        $tiles = array(
            '%' => array('x' => 0, 'y' => 13, 'type' => 1), # Water deep.
            '~' => array('x' => 0, 'y' => 9, 'type' => 1), # Water normal.
            '@' => array('x' => 1, 'y' => 9, 'type' => 2), # Water shallow.
            '.' => array('x' => 2, 'y' => 10, 'type' => 1), # Water shore north.
            ';' => array('x' => 3, 'y' => 10, 'type' => 1), # Water shore east.
            '-' => array('x' => 3, 'y' => 11, 'type' => 1), # Water shore south.
            ':' => array('x' => 2, 'y' => 11, 'type' => 1), # Water shore west.
            '}' => array('x' => 1, 'y' => 10, 'type' => 1), # Water shore north east.
            '{' => array('x' => 0, 'y' => 10, 'type' => 1), # Water shore north west.
            '/' => array('x' => 1, 'y' => 11, 'type' => 1), # Water shore south east.
            '\\' => array('x' => 0, 'y' => 11, 'type' => 1), # Water shore south west.
            'H' => array('x' => 3, 'y' => 9, 'type' => 1), # Water canal up.
            '=' => array('x' => 2, 'y' => 9, 'type' => 1), # Water canal right.
            '>' => array('x' => 1, 'y' => 12, 'type' => 1), # Water arrow left.
            '<' => array('x' => 0, 'y' => 12, 'type' => 1), # Water arrow right.
            'n' => array('x' => 2, 'y' => 12, 'type' => 1), # Water arrow up.
            'u' => array('x' => 3, 'y' => 12, 'type' => 1), # Water arrow down.
            ' ' => array('x' => 0, 'y' => 0, 'type' => 0), # Land normal.
            'G' => array('x' => 0, 'y' => 0, 'type' => 0, 'trigger' => 'gate'), # Land normal.
            '"' => array('x' => 2, 'y' => 1, 'type' => 0), # Land shore north.
            '|' => array('x' => 3, 'y' => 1, 'type' => 0), # Land shore east.
            ',' => array('x' => 3, 'y' => 2, 'type' => 0), # Land shore south.
            '1' => array('x' => 2, 'y' => 2, 'type' => 0), # Land shore west.
            '0' => array('x' => 0, 'y' => 1, 'type' => 0), # Land shore north west.
            '7' => array('x' => 1, 'y' => 1, 'type' => 0), # Land shore north east.
            'J' => array('x' => 1, 'y' => 2, 'type' => 0), # Land shore south east.
            'L' => array('x' => 0, 'y' => 2, 'type' => 0), # Land shore south west.
            '[' => array('x' => 0, 'y' => 5, 'type' => 0), # Land arrow east.
            ']' => array('x' => 1, 'y' => 5, 'type' => 0), # Land arrow west.
            'C' => array('x' => 2, 'y' => 0, 'type' => 0), # Brush arrow north.
            'c' => array('x' => 3, 'y' => 0, 'type' => 0), # Brush arrow south.
            '#' => array('x' => 2, 'y' => 5, 'type' => 0), # Forest.
            '*' => array('x' => 1, 'y' => 0, 'type' => 0), # Brush.
            '8' => array('x' => 2, 'y' => 3, 'type' => 0), # Brush shore north.
            '3' => array('x' => 3, 'y' => 3, 'type' => 0), # Brush shore east.
            'o' => array('x' => 3, 'y' => 4, 'type' => 0), # Brush shore south.
            'E' => array('x' => 2, 'y' => 4, 'type' => 0), # Brush shore west.
            'F' => array('x' => 0, 'y' => 3, 'type' => 0), # Brush shore north west.
            '?' => array('x' => 1, 'y' => 3, 'type' => 0), # Brush shore north east.
            'j' => array('x' => 1, 'y' => 4, 'type' => 0), # Brush shore south east.
            't' => array('x' => 0, 'y' => 4, 'type' => 0), # Brush shore south west.
            'X' => array('x' => 3, 'y' => 5, 'type' => 0), # Rough.
            'Y' => array('x' => 2, 'y' => 7, 'type' => 0), # Rough shore north.
            'i' => array('x' => 3, 'y' => 7, 'type' => 0), # Rough shore east.
            'z' => array('x' => 3, 'y' => 8, 'type' => 0), # Rough shore south.
            'K' => array('x' => 2, 'y' => 8, 'type' => 0), # Rough shore west.
            'R' => array('x' => 0, 'y' => 7, 'type' => 0), # Rough shore north west.
            'q' => array('x' => 1, 'y' => 7, 'type' => 0), # Rough shore north east.
            'g' => array('x' => 1, 'y' => 8, 'type' => 0), # Rough shore south east.
            'h' => array('x' => 0, 'y' => 8, 'type' => 0), # Rough shore south west.
            's' => array('x' => 3, 'y' => 6, 'type' => 0), # Rough arrow east.
            '+' => array('x' => 2, 'y' => 6, 'type' => 0), # Rough arrow west.
            '^' => array('x' => 0, 'y' => 6, 'type' => 2), # Mountain.
            'N' => array('x' => 1, 'y' => 6, 'type' => 2), # Mountain small.
            'x' => array('x' => 1, 'y' => 13, 'type' => 0, 'trigger' => 'effect.poison'), # Poison.
            'f' => array('x' => 2, 'y' => 13, 'type' => 0, 'trigger' => 'effect.lava'), # Lava.
            'V' => array('x' => 3, 'y' => 13, 'type' => 0, 'trigger' => 'effect.lava'), # Volcano.
            'T' => array('x' => 1, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'), # Town.
            'D' => array('x' => 0, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'), # Dungeon.
            'b' => array('x' => 2, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'), # Castle north west.
            'd' => array('x' => 3, 'y' => 14, 'type' => 0, 'trigger' => 'tileset'), # Castle north east.
            'P' => array('x' => 2, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'), # Castle south west.
            'Q' => array('x' => 3, 'y' => 15, 'type' => 0, 'trigger' => 'tileset'), # Castle south east.
            'B' => array('x' => 0, 'y' => 14, 'type' => 0), # Bridge.
            '$' => array('x' => 1, 'y' => 15, 'type' => 0, 'trigger' => 'tileset') # Shrine.
        );

        $return = array(
            'image' => 'tilesets/world.0.1.png',
            'exit' => false,
            'scroll' => true,
            'wrap' => true,
            'start' => array(
                'x' => 0,
                'y' => 0,
                'direction' => 'down'
            ),
            'defaultTile' => array(
                'x' => 0,
                'y' => 15,
                'type' => 0,
                'trigger' => 'blank'
            ),
            'tiles' => array()
        );

        $i = 0;
        $count = strlen(trim(reset($rows)));

        foreach ($rows as $row):
            $row = trim($row);
            for ($x = 0; $x < $count; ++$x):
                if (isset($row[$x])) {
                    $return['tiles'][$i][] = $tiles[$row[$x]];
                } else {
                    $return['tiles'][$i][] = $tiles['%'];
                }
            endfor;
            ++$i;
        endforeach;

        $return['tiles'] = (array)$return['tiles'];
        $return = json_encode($return);

        $SOURCE = fopen($source.'.converted', 'w');
        $rows = fwrite($SOURCE, $return);
        fclose($SOURCE);
        echo $return;
    endif;

    if (isset($_GET['_ajax'])):
        ob_end_flush();
        header('Content-Length: '.ob_get_length());
        ob_end_flush();
    endif;