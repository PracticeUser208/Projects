
namespace SeatBookingSimulator
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.buttonStartCreateAndDisplay_Click = new System.Windows.Forms.Button();
            this.panelSeats = new System.Windows.Forms.Panel();
            this.button_Person_A = new System.Windows.Forms.Button();
            this.button_Person_B = new System.Windows.Forms.Button();
            this.button_Person_D = new System.Windows.Forms.Button();
            this.button_Person_C = new System.Windows.Forms.Button();
            this.button_Reset = new System.Windows.Forms.Button();
            this.labelMessage = new System.Windows.Forms.Label();
            this.button_Save = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.button_seat_layout = new System.Windows.Forms.Button();
            this.button_safe_distance = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // buttonStartCreateAndDisplay_Click
            // 
            this.buttonStartCreateAndDisplay_Click.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.buttonStartCreateAndDisplay_Click.Location = new System.Drawing.Point(37, 29);
            this.buttonStartCreateAndDisplay_Click.Name = "buttonStartCreateAndDisplay_Click";
            this.buttonStartCreateAndDisplay_Click.Size = new System.Drawing.Size(148, 46);
            this.buttonStartCreateAndDisplay_Click.TabIndex = 0;
            this.buttonStartCreateAndDisplay_Click.Text = "Load Seats";
            this.buttonStartCreateAndDisplay_Click.UseVisualStyleBackColor = true;
            this.buttonStartCreateAndDisplay_Click.Click += new System.EventHandler(this.buttonStartCreateAndDisplay_Click_Click);
            // 
            // panelSeats
            // 
            this.panelSeats.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panelSeats.Location = new System.Drawing.Point(333, 12);
            this.panelSeats.Name = "panelSeats";
            this.panelSeats.Size = new System.Drawing.Size(1054, 640);
            this.panelSeats.TabIndex = 2;
            // 
            // button_Person_A
            // 
            this.button_Person_A.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Person_A.Location = new System.Drawing.Point(37, 257);
            this.button_Person_A.Name = "button_Person_A";
            this.button_Person_A.Size = new System.Drawing.Size(280, 45);
            this.button_Person_A.TabIndex = 3;
            this.button_Person_A.Text = "Person A Booking";
            this.button_Person_A.UseVisualStyleBackColor = true;
            this.button_Person_A.Click += new System.EventHandler(this.button_Person_A_Click);
            // 
            // button_Person_B
            // 
            this.button_Person_B.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Person_B.Location = new System.Drawing.Point(37, 308);
            this.button_Person_B.Name = "button_Person_B";
            this.button_Person_B.Size = new System.Drawing.Size(280, 45);
            this.button_Person_B.TabIndex = 4;
            this.button_Person_B.Text = "Person B Booking";
            this.button_Person_B.UseVisualStyleBackColor = true;
            this.button_Person_B.Click += new System.EventHandler(this.button_Person_B_Click);
            // 
            // button_Person_D
            // 
            this.button_Person_D.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Person_D.Location = new System.Drawing.Point(37, 410);
            this.button_Person_D.Name = "button_Person_D";
            this.button_Person_D.Size = new System.Drawing.Size(280, 45);
            this.button_Person_D.TabIndex = 5;
            this.button_Person_D.Text = "Person D Booking";
            this.button_Person_D.UseVisualStyleBackColor = true;
            this.button_Person_D.Click += new System.EventHandler(this.button_Person_D_Click);
            // 
            // button_Person_C
            // 
            this.button_Person_C.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Person_C.Location = new System.Drawing.Point(37, 359);
            this.button_Person_C.Name = "button_Person_C";
            this.button_Person_C.Size = new System.Drawing.Size(280, 45);
            this.button_Person_C.TabIndex = 6;
            this.button_Person_C.Text = "Person C Booking";
            this.button_Person_C.UseVisualStyleBackColor = true;
            this.button_Person_C.Click += new System.EventHandler(this.button_Person_C_Click);
            // 
            // button_Reset
            // 
            this.button_Reset.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Reset.Location = new System.Drawing.Point(37, 461);
            this.button_Reset.Name = "button_Reset";
            this.button_Reset.Size = new System.Drawing.Size(280, 45);
            this.button_Reset.TabIndex = 4;
            this.button_Reset.Text = "Reset Simulator";
            this.button_Reset.UseVisualStyleBackColor = true;
            this.button_Reset.Click += new System.EventHandler(this.button_Reset_Click);
            // 
            // labelMessage
            // 
            this.labelMessage.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.labelMessage.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelMessage.Location = new System.Drawing.Point(37, 524);
            this.labelMessage.Name = "labelMessage";
            this.labelMessage.Size = new System.Drawing.Size(280, 128);
            this.labelMessage.TabIndex = 7;
            // 
            // button_Save
            // 
            this.button_Save.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_Save.Location = new System.Drawing.Point(191, 29);
            this.button_Save.Name = "button_Save";
            this.button_Save.Size = new System.Drawing.Size(126, 46);
            this.button_Save.TabIndex = 8;
            this.button_Save.Text = "Save";
            this.button_Save.UseVisualStyleBackColor = true;
            this.button_Save.Click += new System.EventHandler(this.button_Save_Click);
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(150, 81);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(150, 31);
            this.textBox1.TabIndex = 9;
            // 
            // textBox2
            // 
            this.textBox2.Location = new System.Drawing.Point(150, 118);
            this.textBox2.Name = "textBox2";
            this.textBox2.Size = new System.Drawing.Size(150, 31);
            this.textBox2.TabIndex = 10;
            // 
            // button_seat_layout
            // 
            this.button_seat_layout.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_seat_layout.Location = new System.Drawing.Point(37, 155);
            this.button_seat_layout.Name = "button_seat_layout";
            this.button_seat_layout.Size = new System.Drawing.Size(280, 45);
            this.button_seat_layout.TabIndex = 11;
            this.button_seat_layout.Text = "Setup Cinema Seat Layout";
            this.button_seat_layout.UseVisualStyleBackColor = true;
            this.button_seat_layout.Click += new System.EventHandler(this.button_Seat_Layout_Click);
            // 
            // button_safe_distance
            // 
            this.button_safe_distance.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.button_safe_distance.Location = new System.Drawing.Point(37, 206);
            this.button_safe_distance.Name = "button_safe_distance";
            this.button_safe_distance.Size = new System.Drawing.Size(280, 45);
            this.button_safe_distance.TabIndex = 12;
            this.button_safe_distance.Text = "Setup Safe Distance Mode";
            this.button_safe_distance.UseVisualStyleBackColor = true;
            this.button_safe_distance.Click += new System.EventHandler(this.button_Safe_Distance_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(95, 84);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(49, 25);
            this.label1.TabIndex = 13;
            this.label1.Text = "Row";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label2.Location = new System.Drawing.Point(13, 121);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(131, 25);
            this.label2.TabIndex = 14;
            this.label2.Text = "Seats Per Row";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 25F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1453, 765);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.button_safe_distance);
            this.Controls.Add(this.button_seat_layout);
            this.Controls.Add(this.textBox2);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.button_Save);
            this.Controls.Add(this.labelMessage);
            this.Controls.Add(this.button_Reset);
            this.Controls.Add(this.button_Person_C);
            this.Controls.Add(this.button_Person_D);
            this.Controls.Add(this.button_Person_B);
            this.Controls.Add(this.button_Person_A);
            this.Controls.Add(this.panelSeats);
            this.Controls.Add(this.buttonStartCreateAndDisplay_Click);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonStartCreateAndDisplay_Click;
        private System.Windows.Forms.Panel panelSeats;
        private System.Windows.Forms.Button button_Person_A;
        private System.Windows.Forms.Button button_Person_B;
        private System.Windows.Forms.Button button_Person_D;
        private System.Windows.Forms.Button button_Person_C;
        private System.Windows.Forms.Button button_Reset;
        private System.Windows.Forms.Label labelMessage;
        private System.Windows.Forms.Button button_Save;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.Button button_seat_layout;
        private System.Windows.Forms.Button button_safe_distance;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
    }
}

