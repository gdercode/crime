<?php
	$_SESSION['page_name']='identification';
	$this->load->view('crime/main_parts/header'); 

	$total_wanted = count($all_wanted_ids);
	echo '<input type="hidden" id="total_wanted"  value="'.$total_wanted.'">';

	echo 'total number of all wanted = '.$total_wanted;
	for($i=0; $i<$total_wanted; $i++)
	{
	    echo '<input type="hidden" id="'.$i.'"  value="'. $all_wanted_ids[$i]['wanted_id'].'">';
	}
?>

<div class="menu">
	<?php	$this->load->view('crime/main_parts/menu'); 	// call menu ?> 
</div>

<nav class="miniMenu"> 
	<ul>
		<li>
			<a href="<?php echo base_url() ?>crime/crime_identification/Crime_identification_Controller/web_camera" > Use Camera </a>
		</li>

		<li>
			<a> <label id="image-input-label" for="image-input">Upload</label> </a>
		</li>

		<li>
			<a> <label id="submitBtn-label" for="submitBtn">    View  </label> </a>
		</li>
	</ul>
</nav>

<div id="logContainer">

	<div id="loginBox">
		<input type="hidden" id="baseURL"  value="<?php echo base_url(); ?>">
	</div>
	<center><b id="message" class="errorMessage" ></b></center>
</div>
<div id="display-image"></div>
<input type="file" id="image-input" name="image" accept="image/jpeg, image/png, image/jpg">
<!-- <label id="image-input-label" for="image-input">Upload</label> -->

<form method="post" action="<?php echo base_url("crime/user/userController/wanted_find_list_c2") ?>">
	<input type="hidden" id="detected" name="wanted_id">
	<input type="submit" id="submitBtn" name="">
	<!-- <label id="submitBtn-label" for="submitBtn">View</label> -->
</form>





<script difer src="<?php echo base_url('assets/javascript/face-login/face-api.min.js'); ?>"></script>
<script difer src=" <?= base_url('assets/javascript/jquery.3.min.js'); ?> "></script>
<script difer src="<?php echo base_url('assets/javascript/face-login/face-login.js'); ?>"></script>


<?php $this->load->view('crime/main_parts/footer'); ?>
