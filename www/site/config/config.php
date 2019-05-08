<?php

@include __DIR__ . DS . 'license.php';

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('debug', true);

kirby()->hook(['panel.page.update', 'panel.page.sort'], function($page) {
  if($page->intendedTemplate() == 'article') {
    $letterArray = [
      'X',
      'A', 
      'B', 
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J', 
      'K', 
      'L', 
      'M', 
      'N', 
      'O', 
      'P', 
      'Q',
      'R', 
      'S', 
      'T', 
      'U', 
      'V',
      'W', 
      'X', 
      'Y', 
      'Z',
      'AA', 
      'BB', 
      'CC',
      'DD',
      'EE',
    ];
  
    $date = $page->date();
    $year = intval(substr(date("Y", $date), 2, 2));
    $year = $letterArray[$year];
    $month = intval(substr(date("m", $date), 0, 2));
    $month = $letterArray[$month];
    $day = intval(substr(date("d", $date), 0, 2));
    $day = $letterArray[$day];
  
    $zip = $page->zip();
    $zip1 = substr($zip, 0, 1);
    $zip2 = substr($zip, 1, 1);
    $zip3 = substr($zip, 2, 1);
  
    $slug = 
    (string)$year.
    (string)$month.
    (string)$day.
    (string)$letterArray[$zip1].
    (string)$letterArray[$zip2].
    (string)$letterArray[$zip3].
    (string)$page->degrees().
    (string)$page->weather().
    (string)$page->emotion();
    
    try {
      $page->update(array(
        'title' => $slug,
      ));
      $page->move($slug);
    } catch(Exception $e) {
      echo $e->getMessage();
    }
    // $page->move('test');
  }
});

kirby()->hook('panel.page.update', function($page) {
  if ($page->uploadToggle()->value() === "true") {
    // importing the necessary Cloudinary files
    require '../../vendor/cloudinary/cloudinary_php/src/Cloudinary.php';
    require '../../vendor/cloudinary/cloudinary_php/src/Uploader.php';
    require '../../vendor/cloudinary/cloudinary_php/src/Helpers.php';
    require '../../vendor/cloudinary/cloudinary_php/src/Api.php';
    require '../../vendor/cloudinary/cloudinary_php/src/Error.php';

    \Cloudinary::config(array(
      "cloud_name" => "richterskala",
      "api_key" => "741172134745961",
      "api_secret" => "1duseF1b_P38_f_XFL7MMDPnpag"
    ));

    try {
      foreach($page->files() as $file) {
        if($file->type() == 'video') {
          \Cloudinary\Uploader::upload_large($file->root(), 
          array("folder" => $page->title(), "public_id" => $page->hash()."-".$file->hash(), "overwrite" => TRUE));
        } else if ($file->type() == 'image') {
          \Cloudinary\Uploader::upload($file->root(), 
          array("folder" => $page->title(), "public_id" => $page->hash()."-".$file->hash(), "overwrite" => TRUE));
        } else if ($file->type() == 'audio') {
          \Cloudinary\Uploader::upload_large($file->root(), 
          array("folder" => $page->title(), "public_id" => $page->hash()."-".$file->hash(), "overwrite" => TRUE));
        }
      }
    } catch(Exception $e) {
      echo $e->getMessage();
    }
  }
});