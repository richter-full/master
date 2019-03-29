<?php
header('Content-type: application/json; charset=utf-8');

//this is the magic command which grabs all data from pages. If You wanna grab specific page articles, look at the base example mentioned above
$data = $site->index()->not('error', 'home', 'api', 'articles');

$json = array();
$json['articles'] = array();
$json['config'] = array();
$json['globals'] = array();

// $json['categories'] = array();

$i = 0;

$n = 0;

foreach($data as $dataEntry) {
  if($dataEntry->files()) {
    $media = array();

    if($dataEntry->images()) {
      $media['images'] = array();

      if($dataEntry->mainImages()->isNotEmpty()) {
        $media['images']['mainImages'] = FillArrayFile($dataEntry, $dataEntry->mainImages()->split(','));
      }

      if($dataEntry->actionImages()->isNotEmpty()) {
        $media['images']['actionImages'] = FillArrayFile($dataEntry, $dataEntry->actionImages()->split(','));
      }

      if($dataEntry->additionalImages()->isNotEmpty()) {
        $media['images']['additionalImages'] = FillArrayFile($dataEntry, $dataEntry->additionalImages()->split(','));
      }
    }

    if($dataEntry->videos()) {
      $media['videos'] = array();

      if($dataEntry->actionVideoFiles()->isNotEmpty()) {
        $media['videos']['actionVideoFiles'] = FillArrayFile($dataEntry, $dataEntry->actionVideoFiles()->split(','));
      }

      if($dataEntry->actionVideoLink()->isNotEmpty()) {
        $media['videos']['actionVideoLink'] = FillArrayLink($dataEntry->actionVideoLink());
      }

      if($dataEntry->afterVideoFiles()->isNotEmpty()) {
        $media['videos']['afterVideoFiles'] = FillArrayFile($dataEntry, $dataEntry->afterVideoFiles()->split(','));
      }

      if($dataEntry->afterVideoLink()->isNotEmpty()) {
        $media['videos']['afterVideoLink'] = FillArrayLink($dataEntry->afterVideoLink());
      }
    }
    
    if($dataEntry->audios()) {
      $media['audios'] = array();

      if($dataEntry->audioFile()->isNotEmpty()) {
        $media['audios']['audioFile'] = FillArrayFile($dataEntry, $dataEntry->audioFile()->split(','));
      }

      if($dataEntry->audioLink()->isNotEmpty()) {
        $media['audios']['audioLink'] = FillArrayLink($dataEntry->audioLink());
      }
    }

    $static = array(
      'url' => (string)$dataEntry->url(),
      'uri' => (string)$dataEntry->uri(),
      'slug' => (string)$dataEntry->slug(),
      'num' => (string)$dataEntry->num(),
      'title' => (string)$dataEntry->title(),
      'hash' => (string)$dataEntry->hash()
    );

    $additionals = array(
      'subtitle' => (string)$dataEntry->subtitle(),
      'description' => (string)$dataEntry->description()->kt(),
    );

    $quote = array(
      'text' => (string)$dataEntry->quoteText(),
      'author' => (string)$dataEntry->quoteAuthor(),
    );

    $meta = array(
      'tags' => (string)$dataEntry->tags(),
      'date' => (string)$dataEntry->date(),
      'zip' => (string)substr($dataEntry->zip(), 0, 3),
      'degrees' => (string)$dataEntry->degrees(),
      'weather' => (string)$dataEntry->weather(),
      'emotion' => (string)$dataEntry->emotion(),
    );

    $info = array(
      'static' => $static,
      'additionals' => $additionals,
      'quote' => $quote,
      'meta' => $meta,
    );

    $structure = array();

    foreach ($dataEntry->contentStructure()->toStructure() as $entry) {
      $structure[] = array(
        'selector' => (string)$entry->selector(),
        'type' => (string)$entry->type(),
        'start' => (string)$entry->start(),
        'span' => (string)$entry->span(),
      );
    };
  }

  $json['articles'][] = array(
    'info' => $info,
    'media' => $media,
    'structure' => $structure,
  );

  $cleanData = array_filter($json['articles']);
  $json['articles'] = $cleanData;
  $i++;
}

echo json_encode($json);

function FillArrayFile($root, $filenames) {
  if(count($filenames) < 2) $filenames = array_pad($filenames, 2, '');
  $files = call_user_func_array(array($root->files(), 'find'), $filenames);
  
  foreach($files as $file) {
    if($file->type() == 'image') {
      $filesArray[] = array(
        'type'  => $file->type(),
        'extension' => $file->extension(),
        'hash' => $file->hash(),
        'initialWidth' => $file->width(),
        'initialHeight' => $file->height(),
      );
    } else {
      $filesArray[] = array(
        'type'  => $file->type(),
        'extension' => $file->extension(),
        'hash' => $file->hash(),
      );
    }
  }
  return $filesArray; 
}

function FillArrayLink($link) {
  $linkArray[] = array(
    'url' => (string)$link,
  );

  return $linkArray;
}

?>