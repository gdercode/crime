<?php
	$_SESSION['page_name']='user';
	$this->load->view('crime/main_parts/header');  // call header 
?> 	
	<div class="menu">
		<?php	$this->load->view('crime/main_parts/menu'); 	// call menu ?> 
	</div>
<?php
	$error = isset($error) ? $error : '';
?>

<div id="table_box">
<div class="tables">
	<h3><?php echo $error; ?> </h3>
	<h1>Wanted</h1>
	<table>
		<div id="cont">
		<thead>
			<tr>
				<th> Wanted ID </th>
				<th> Wanted FN </th>
				<th> Wanted LN </th>
				<th> Edit </th>
			</tr>
		</thead>
		<tbody>
			<?php
				if (isset($all_wanted)) 
				{
					foreach ($all_wanted as $result) // get row by row data to avoid array 
					{
			?>
						<tr>
							<td> <?php echo $result['wanted_id']; ?> </td>
							<td> <?php echo $result['wanted_first_name']; ?> </td>
							<td> <?php echo $result['wanted_last_name']; ?> </td>
							<td>
								<form method="post" action="<?php echo base_url() ?>crime/user/userController/wanted_find_list_c" >
									<input type="submit" value="Edit" name="edit_button">
									<input type="hidden" name="wanted_id" value="<?php echo $result['wanted_id'];  ?> "/>
								</form>
							</td>
						</tr>
					
			<?php 

					}
				}
			?>
		</tbody>
		</div>	
	</table>
</div>
</div>



<?php $this->load->view('crime/main_parts/footer'); ?>