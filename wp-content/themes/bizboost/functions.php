<?php
/**
 * BizBoost functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package BizBoost
 * @since 1.0
 */

if ( ! function_exists( 'bizboost_support' ) ) :

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * @since 1.0
     *
     * @return void
     */
    function bizboost_support() {

        // Add support for block styles.
        add_theme_support( 'wp-block-styles' );

        // Enqueue editor styles.
        add_editor_style( 'style.css' );
    }

endif;

add_action( 'after_setup_theme', 'bizboost_support' );

if ( ! function_exists( 'bizboost_styles' ) ) :

    /**
     * Enqueue styles.
     *
     * @since 1.0
     *
     * @return void
     */
    function bizboost_styles() {
        // Enqueue theme stylesheet.
        wp_enqueue_style(
            'bizboost-style',
            get_template_directory_uri() . '/style.css',
            array(),
            filemtime( get_theme_file_path( 'style.css' ) )
        );

        wp_enqueue_script(
            'bizboost-script',
            get_template_directory_uri() . '/assets/js/custom.js', // Исправлено на правильный путь
            array(),
            filemtime( get_theme_file_path( 'assets/js/custom.js' ) ),
            true
        );
    }

endif;

add_action( 'wp_enqueue_scripts', 'bizboost_styles' );

if ( ! function_exists( 'bizboost_block_editor_styles' ) ) :

    /**
     * Enqueue rtl editor styles
     */
    function bizboost_block_editor_styles() {
        if( is_rtl() ){
            wp_enqueue_style(
                'bizboost-rtl',
                get_theme_file_uri( 'rtl.css' ),
                array(),
                filemtime( get_theme_file_path( 'rtl.css' ) )
            );
        }
    }

endif;

add_action( 'enqueue_block_editor_assets', 'bizboost_block_editor_styles' );

// Add block patterns
require get_template_directory() . '/inc/block-patterns.php';

// Add block styles
require get_template_directory() . '/inc/block-styles.php';

// Block Filters
require get_template_directory() . '/inc/block-filters.php';

// Svg icons
require get_template_directory() . '/inc/icon-function.php';

// Theme About Page
require get_template_directory() . '/inc/about.php';


function processors_selection_shortcode() {
    ob_start();
    // Код вывода процессоров
    $args = array(
        'post_type' => 'processors',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="processor-select">Процессор:</label>
        <select id="processor-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
    <?php the_title(); ?>
</option>
            <?php endwhile; ?>
        </select>
        <div id="processor-details" style="margin-top: 20px;">
            <p>Информация о процессоре появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступных процессоров.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('processor_selection', 'processors_selection_shortcode');

function get_processor_details_callback() {
    if (!isset($_POST['processor_id']) || empty($_POST['processor_id'])) {
        wp_send_json_error('ID процессора не передан.');
    }

    $processor_id = intval($_POST['processor_id']);

    $socket = get_post_meta($processor_id, 'socket', true);
    $tdw = get_post_meta($processor_id, 'tdw', true);
    $freq = get_post_meta($processor_id, 'freq', true);
    $release_date = get_post_meta($processor_id, 'release_date', true);

    if (!$socket && !$tdw && !$freq && !$release_date) {
        wp_send_json_error('Данные для процессора не найдены.');
    }

    wp_send_json_success(array(
        'socket' => $socket,
        'tdw' => $tdw,
        'freq' => $freq,
        'release_date' => $release_date,
    ));
}

add_action('wp_ajax_get_processor_details', 'get_processor_details_callback');
add_action('wp_ajax_nopriv_get_processor_details', 'get_processor_details_callback');






function power_unit_selection_shortcode() {
    ob_start();
    // Код вывода блоков питания
    $args = array(
        'post_type' => 'power_unit',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="power_unit-select">Блок питания:</label>
        <select id="power_unit-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
    <?php the_title(); ?>
</option>
            <?php endwhile; ?>
        </select>
        <div id="power_unit-details" style="margin-top: 20px;">
            <p>Информация о блоке питания появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступных блоков питания.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('power_unit_selection', 'power_unit_selection_shortcode');

function get_power_unit_details_callback() {
    if (!isset($_POST['power_unit_id']) || empty($_POST['power_unit_id'])) {        
	wp_send_json_error('ID блока питания не передан.');
    }

    $power_unit_id = intval($_POST['power_unit_id']);
    $form_factor = get_post_meta($power_unit_id, 'form_factor', true);
    $effect = get_post_meta($power_unit_id, 'effect', true);
    $wat = get_post_meta($power_unit_id, 'wat', true);
    $color = get_post_meta($power_unit_id, 'color', true);

    if (!$form_factor && !$effect && !$wat && !$color) {
        wp_send_json_error('Данные для блока питания не найдены.');
    }

    wp_send_json_success(array(
	'form_factor' => $form_factor,
        'effect' => $effect,
        'wat' => $wat,
        'color' => $color,
    ));
}

add_action('wp_ajax_get_power_unit_details', 'get_power_unit_details_callback');
add_action('wp_ajax_nopriv_get_power_unit_details', 'get_power_unit_details_callback');




function mother_board_selection_shortcode() {
    ob_start();
    // Код вывода блоков питания
    $args = array(
        'post_type' => 'mother_board',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="mother_board-select">Материнская плата:</label>
        <select id="mother_board-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
    <?php the_title(); ?>
</option>
            <?php endwhile; ?>
        </select>
        <div id="mother_board-details" style="margin-top: 20px;">
            <p>Информация о материнской плате появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступных материнских плат.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('mother_board_selection', 'mother_board_selection_shortcode');

function get_mother_board_details_callback() {
    if (!isset($_POST['mother_board_id']) || empty($_POST['mother_board_id'])) {
        wp_send_json_error('ID материнской платы не передан.');
    }

    $mother_board_id = intval($_POST['mother_board_id']);
    $socket = get_post_meta($mother_board_id, 'socket', true);
    $form_factor = get_post_meta($mother_board_id, 'form_factor', true);
    $max_memory = get_post_meta($mother_board_id, 'max_memory', true);
    $max_slots = get_post_meta($mother_board_id, 'max_slots', true);
    $color = get_post_meta($mother_board_id, 'color', true);
    $type_DDR = get_post_meta($mother_board_id, 'type_DDR', true);

    if (!$socket && !$form_factor && !$max_memory && !$max_slots && !$color && !$type_DDR) {
        wp_send_json_error('Данные для материнской платы не найдены.');
    }

    wp_send_json_success(array(
	'socket' => $socket,
	'form_factor' => $form_factor,
        'max_memory' => $max_memory,
        'max_slots' => $max_slots,
        'color' => $color,
	'type_DDR' => $type_DDR,
    ));
}

add_action('wp_ajax_get_mother_board_details', 'get_mother_board_details_callback');
add_action('wp_ajax_nopriv_get_mother_board_details', 'get_mother_board_details_callback');




function video_card_selection_shortcode() {
    ob_start();
    // Код вывода блоков питания
    $args = array(
        'post_type' => 'video_card',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="video_card-select">Видеокарта:</label>
        <select id="video_card-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
                    <?php the_title(); ?>
                </option>
            <?php endwhile; ?>
        </select>
        <div id="video_card-details" style="margin-top: 20px;">
            <p>Информация о видеокартах появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступных материнских плат.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('video_card_selection', 'video_card_selection_shortcode');

function get_video_card_details_callback() {
    if (!isset($_POST['video_card_id']) || empty($_POST['video_card_id'])) {
        wp_send_json_error('ID видеокарты не передан.');
    }

    $video_card_id = intval($_POST['video_card_id']);
    $chipset = get_post_meta($video_card_id, 'chipset', true);
    $memory = get_post_meta($video_card_id, 'memory', true);
    $core_clock = get_post_meta($video_card_id, 'core_clock', true);
    $max_memory = get_post_meta($video_card_id, 'max_memory', true);
    $color = get_post_meta($video_card_id, 'color', true);

    if (!$chipset && !$memory && !$core_clock && !$max_memory && !$color) {
        wp_send_json_error('Данные для видеокарты не найдены.');
    }

    wp_send_json_success(array(
	'chipset' => $chipset,
	'memory' => $memory,
        'core_clock' => $core_clock,
        'max_memory' => $max_memory,
        'color' => $color,
    ));
}

add_action('wp_ajax_get_video_card_details', 'get_video_card_details_callback');
add_action('wp_ajax_nopriv_get_video_card_details', 'get_video_card_details_callback');

function memory_selection_shortcode() {
    ob_start();
    // Код вывода блоков питания
    $args = array(
        'post_type' => 'memory',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="memory-select">Оперативная память:</label>
        <select id="memory-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
                    <?php the_title(); ?>
                </option>
            <?php endwhile; ?>
        </select>
        <div id="memory-details" style="margin-top: 20px;">
            <p>Информация о оперативной памяти появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступной оперативной памяти.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('memory_selection', 'memory_selection_shortcode');

function get_memory_details_callback() {
    if (!isset($_POST['memory_id']) || empty($_POST['memory_id'])) {
        wp_send_json_error('ID оперативной памяти не передан.');
    }

    $memory_id = intval($_POST['memory_id']);
    $speed = get_post_meta($memory_id, 'speed', true);
    $moduls = get_post_meta($memory_id, 'moduls', true);
    $color = get_post_meta($memory_id, 'color', true);
    $first_word = get_post_meta($memory_id, 'first_word', true);
    $cas_latency = get_post_meta($memory_id, 'cas_latency', true);

    if (!$speed && !$moduls && !$color && !$first_word && !$cas_latency) {
        wp_send_json_error('Данные для оперативной памяти не найдены.');
    }

    wp_send_json_success(array(
	'speed' => $speed,
	'moduls' => $moduls,
        'color' => $color,
        'first_word' => $first_word,
        'cas_latency' => $cas_latency,
    ));
}

add_action('wp_ajax_get_memory_details', 'get_memory_details_callback');
add_action('wp_ajax_nopriv_get_memory_details', 'get_memory_details_callback');

function internal_hard_drive_selection_shortcode() {
    ob_start();
    // Код вывода блоков питания
    $args = array(
        'post_type' => 'internal_hard_drive',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="internal_hard_drive-select">Устройства хранения памяти:</label>
        <select id="internal_hard_drive-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
                    <?php the_title(); ?>
                </option>
            <?php endwhile; ?>
        </select>
        <div id="internal_hard_drive-details" style="margin-top: 20px;">
            <p>Информация о устройствах хранения. появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступной устройсвта хранения.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('internal_hard_drive_selection', 'internal_hard_drive_selection_shortcode');

function get_internal_hard_drive_details_callback() {
    if (!isset($_POST['internal_hard_drive_id']) || empty($_POST['internal_hard_drive_id'])) {
        wp_send_json_error('ID устройства хранения памяти не передан.');
    }

    $internal_hard_drive_id = intval($_POST['internal_hard_drive_id']);
    $capacity = get_post_meta($internal_hard_drive_id, 'capacity', true);
    $type = get_post_meta($internal_hard_drive_id, 'type', true);
    $form_factor = get_post_meta($internal_hard_drive_id, 'form_factor', true);
    $interface = get_post_meta($internal_hard_drive_id, 'interface', true);

    if (!$capacity && !$type && !$form_factor && !$interface) {
        wp_send_json_error('Данные для устройства хранения не найдены.');
    }

    wp_send_json_success(array(
	'capacity' => $capacity,
	'type' => $type,
        'form_factor' => $form_factor,
        'interface' => $interface,
    ));
}

add_action('wp_ajax_get_internal_hard_drive_details', 'get_internal_hard_drive_details_callback');
add_action('wp_ajax_nopriv_get_internal_hard_drive_details', 'get_internal_hard_drive_details_callback');


function fan_selection_shortcode() {
    ob_start();
    // Код вывода процессоров
    $args = array(
        'post_type' => 'fan',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="fan-select">Охлаждение:</label>
        <select id="fan-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <option value="<?php echo get_the_ID(); ?>">
                    <?php the_title(); ?>
                </option>
            <?php endwhile; ?>
        </select>
        <div id="fan-details" style="margin-top: 20px;">
            <p>Информация о охлаждении появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступного охлаждениея.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('fan_selection', 'fan_selection_shortcode');

function get_fan_details_callback() {
    if (!isset($_POST['fan_id']) || empty($_POST['fan_id'])) {
        wp_send_json_error('ID охлаждения не передан.');
    }

    $fan_id = intval($_POST['fan_id']);

    $rpm = get_post_meta($fan_id, 'rpm', true);
    $noise_level = get_post_meta($fan_id, 'noise_level', true);
    $color = get_post_meta($fan_id, 'color', true);
    $size = get_post_meta($fan_id, 'size', true);

    if (!$rpm && !$noise_level && !$color && !$size) {
        wp_send_json_error('Данные для охлаждения не найдены.');
    }

    wp_send_json_success(array(
        'rpm' => $rpm,
        'noise_level' => $noise_level,
        'color' => $color,
        'size' => $size,
    ));
}

add_action('wp_ajax_get_fan_details', 'get_fan_details_callback');
add_action('wp_ajax_nopriv_get_fan_details', 'get_fan_details_callback');

function case_selection_shortcode() {
    ob_start();
    // Код вывода процессоров
    $args = array(
        'post_type' => 'case',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) : ?>
        <label for="case-select">Корпус:</label>
        <select id="case-select">
            <option value="">-- Выберите --</option>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
               <option value="<?php echo get_the_ID(); ?>">
                    <?php the_title(); ?>
                </option>
            <?php endwhile; ?>
        </select>
        <div id="case-details" style="margin-top: 20px;">
            <p>Информация о корпусе появится здесь...</p>
        </div>
    <?php else : ?>
        <p>Нет доступного корпуса.</p>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('case_selection', 'case_selection_shortcode');

function get_case_details_callback() {
    if (!isset($_POST['case_id']) || empty($_POST['case_id'])) {
        wp_send_json_error('ID корпуса не передан.');
    }

    $case_id = intval($_POST['case_id']);

    $for_factor = get_post_meta($case_id, 'for_factor', true);
    $color = get_post_meta($case_id, 'color', true);
    $side_panel = get_post_meta($case_id, 'side_panel', true);
    $internal_35_bays = get_post_meta($case_id, 'internal_35_bays', true);
    $external = get_post_meta($case_id, 'external', true);


    if (!$for_factor && !$color && !$side_panel && !$internal_35_bays && !$external) {
        wp_send_json_error('Данные для корпуса не найдены.');
    }

    wp_send_json_success(array(
        'for_factor' => $for_factor,
        'color' => $color,
        'side_panel' => $side_panel,
        'internal_35_bays' => $internal_35_bays,
	'external' => $external,
    ));
}

add_action('wp_ajax_get_case_details', 'get_case_details_callback');
add_action('wp_ajax_nopriv_get_case_details', 'get_case_details_callback');

function enqueue_custom_scripts() {
    wp_enqueue_script(
        'custom-scripts',
        get_template_directory_uri() . '/assets/js/custom.js',
        array('jquery'),
        null,
        true
    );

    wp_localize_script('custom-scripts', 'ajaxurl', admin_url('admin-ajax.php'));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

