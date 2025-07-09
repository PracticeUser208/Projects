using SeatBookingSimulator.Classes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.CompilerServices;
using System.IO;

namespace SeatBookingSimulator
{
    public partial class Form1 : Form
    {
        SeatManager _seatManager = new SeatManager();
        SeatBlock _seatBlock = new SeatBlock();
        private string person = "";
        private bool safe_distance = false, lockSurroundingSeats = false;
        private int maxRow = 0, maxColumn = 0, seatLeft_A = 4, seatLeft_B = 4, seatLeft_C = 4, seatLeft_D = 4, seatLeft = 0, selectionTime = 0;
        private List<int> InsertAisleAfterRow = new List<int> { 2, 5 };
        private List<int> InsertAisleAfterColumn = new List<int> { 5, 11 };
        private List<int> SegmentCount = new List<int> { };
        private List<Seat> Person_A_Booking = new List<Seat>();
        private List<Seat> Person_B_Booking = new List<Seat>();
        private List<Seat> Person_C_Booking = new List<Seat>();
        private List<Seat> Person_D_Booking = new List<Seat>();
        private List<Seat> Person_Booking = new List<Seat>();
        private List<Seat> AllSeat_Booking = new List<Seat>();
        private List<Seat> BookableSeatList = new List<Seat>();
        private List<Seat> LockedSeats = new List<Seat>();

        public Form1()
        {
            InitializeComponent();
        }

        private void button_Seat_Layout_Click(object sender, EventArgs e)
        {
            maxRow = int.Parse(textBox1.Text);
            maxColumn = int.Parse(textBox2.Text);
            InsertAisleAfterRow.Add(maxRow);
            InsertAisleAfterColumn.Add(maxColumn);
            int seatWidth = 50, seatHeight = 50, screenWidth = 490, screenHeight = 45, aisleWidthRow = 0, aisleWidthColumn = 0, x = 0, y = 0; ;

            for (x = 1; x <= maxRow; x++)
            {
                aisleWidthColumn = 0;
                for (y = 1; y <= maxColumn; y++)
                {
                    Label labelSeat = new Label();
                    Seat seat = _seatManager.InsertOneSeat(x, y, InsertAisleAfterRow, InsertAisleAfterColumn);

                    labelSeat.Top = 10 + (x * (seatHeight + 5)) + 15 + aisleWidthRow;
                    labelSeat.Left = 10 + (y * (seatWidth + 5)) + 15 + aisleWidthColumn;
                    labelSeat.Width = seatWidth;
                    labelSeat.Height = seatHeight;
                    labelSeat.BorderStyle = BorderStyle.FixedSingle;
                    labelSeat.BackColor = Color.LightGray;
                    labelSeat.Click += new EventHandler(HandleLabelClick);
                    labelSeat.Tag = seat;
                    labelSeat.Text = seat.ComputeSeatLabel();
                    labelSeat.TextAlign = (ContentAlignment)HorizontalAlignment.Center;
                    labelSeat.Font = new Font("Segoe UI", 9, FontStyle.Bold);
                    labelSeat.Name = y.ToString() + "-" + x.ToString();

                    panelSeats.Controls.Add(labelSeat);

                    int resultColumn = InsertAisleAfterColumn.Find(item => item == y);

                    if (resultColumn != 0)
                    {
                        aisleWidthColumn += 50;
                    }
                }

                int resultRow = InsertAisleAfterRow.Find(item => item == x);

                if (resultRow != 0)
                {
                    aisleWidthRow += 50;
                }
            }

            Label labelscreen = new Label();
            labelscreen.Top = 10;
            labelscreen.Left = 295;
            labelscreen.Width = screenWidth;
            labelscreen.Height = screenHeight;
            labelscreen.BorderStyle = BorderStyle.FixedSingle;
            labelscreen.BackColor = Color.LightCoral;
            labelscreen.Text = "Screen";
            labelscreen.TextAlign = (ContentAlignment)HorizontalAlignment.Center;
            labelscreen.Font = new Font("Segoe UI", 14, FontStyle.Bold);

            _seatManager.SegmentSeatCounter(SegmentCount);
            panelSeats.Controls.Add(labelscreen);
        }

        private void button_Safe_Distance_Click(object sender, EventArgs e)
        {
            safe_distance = true;
            labelMessage.Text = "You are booking seats with the implementation of safe distancing!";
        }

        private void HandleLabelClick(object sender, EventArgs e)
        {
            Label labelSeat = (Label)sender;
            Seat seat = (Seat)labelSeat.Tag;

            if (seat.BookedStatus == false && seatLeft != 0)
            {
                seat = _seatManager.FindOneSeatToBook(seat.Row, seat.SeatNumber, person);

                if (person == "A")
                {
                    Person_Booking = Person_A_Booking;
                }
                else if (person == "B")
                {
                    Person_Booking = Person_B_Booking;
                }
                else if (person == "C")
                {
                    Person_Booking = Person_C_Booking;
                }
                else if (person == "D")
                {
                    Person_Booking = Person_D_Booking;
                }

                // Building Validation Tree
                if (selectionTime == 0 && person != "")
                {
                    selectionTime += 1;
                    int depth = 0;

                    if (SegmentCount[seat.Segment_No - 1] < 10)
                    {
                        depth = 2;
                    }
                    else
                    {
                        depth = 3;
                    }

                    if (safe_distance == false)
                    {
                        BookableSeatList = _seatBlock.BuildValidationTreeNoRestriction(seat, depth);
                    }
                    else
                    {
                        BookableSeatList = _seatBlock.BuildValidationTreeWithRestriction(seat, depth);
                    }

                    if (BookableSeatList.Count == 0)
                    {
                        labelMessage.Text = "You can only book this seat!";
                    }
                    
                    seat.ParentTreeNode = null;
                    foreach (Label control in this.panelSeats.Controls)
                    {
                        if (BookableSeatList.Contains((Seat)control.Tag))
                        {
                            control.BackColor = Color.LightGreen;
                        }
                    }
                    labelSeat.BackColor = Color.Yellow;
                    seat.BookedStatus = true;
                    Person_Booking.Add(seat);
                    AllSeat_Booking.Add(seat);
                    seatLeft -= 1;
                    labelMessage.Text = "You have booked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                }
                else
                {
                    if (BookableSeatList.Contains(seat))
                    {
                        if (seat.ParentTreeNode.Parent.Data.BookedStatus == true)
                        {
                            labelSeat.BackColor = Color.Yellow;
                            seat.BookedStatus = true;
                            seatLeft = seatLeft - 1;
                            Person_Booking.Add(seat);
                            AllSeat_Booking.Add(seat);
                            labelMessage.Text = "You have booked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                        }
                        else
                        {
                            var seatName = seat.ParentTreeNode.Parent.Data;
                            labelMessage.Text = "You have to book " + seatName.ComputeSeatLabel() + " first!\n\nSeats Remaining: " + seatLeft;
                        }
                    }
                    else
                    {
                        labelMessage.Text = "You cannot book " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                    }
                }

                if (Person_Booking.Count == 4)
                {
                    labelMessage.Text = "You cannot book anymore seats\n\nSeats Remaining: " + seatLeft;
                }
            }
            else if (seat.BookedStatus == true && seat.Person == person)
            {
                if (seat.ParentTreeNode == null)
                {
                    foreach (Label control in this.panelSeats.Controls)
                    {
                        if (BookableSeatList.Contains((Seat)control.Tag))
                        {
                            control.BackColor = Color.LightGray;
                        }
                    }
                    seat = _seatManager.FindOneSeatToUnbook(seat.Row, seat.SeatNumber, person);
                    labelSeat.BackColor = Color.LightGray;
                    selectionTime = 0;
                    seat.BookedStatus = false;
                    Person_Booking.Clear();
                    AllSeat_Booking.Clear();
                    seatLeft += 1;
                    labelMessage.Text = "You have unbooked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                }
                else
                {
                    if (seat.ParentTreeNode.ChildNode.Count == 0)
                    {
                        seat = _seatManager.FindOneSeatToUnbook(seat.Row, seat.SeatNumber, person);
                        labelSeat.BackColor = Color.LightGreen;
                        seat.BookedStatus = false;
                        Person_Booking.Remove(seat);
                        AllSeat_Booking.Remove(seat);
                        seatLeft += 1;
                        labelMessage.Text = "You have unbooked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                    }
                    else if (seat.ParentTreeNode.ChildNode.Count == 1)
                    {
                        if (seat.ParentTreeNode.ChildNode[0].Data.BookedStatus == false)
                        {
                            seat = _seatManager.FindOneSeatToUnbook(seat.Row, seat.SeatNumber, person);
                            labelSeat.BackColor = Color.LightGreen;
                            seat.BookedStatus = false;
                            Person_Booking.Remove(seat);
                            AllSeat_Booking.Remove(seat);
                            seatLeft += 1;
                            labelMessage.Text = "You have unbooked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                        }
                        else
                        {
                            var seatName = seat.ParentTreeNode.ChildNode[0].Data;
                            labelMessage.Text = "Please unbook " + seatName.ComputeSeatLabel() + " first!";
                        }
                    }
                    else
                    {
                        if (seat.ParentTreeNode.ChildNode[0].Data.BookedStatus == false)
                        {
                            if (seat.ParentTreeNode.ChildNode[1].Data.BookedStatus == false)
                            {
                                seat = _seatManager.FindOneSeatToUnbook(seat.Row, seat.SeatNumber, person);
                                labelSeat.BackColor = Color.LightGreen;
                                seat.BookedStatus = false;
                                Person_Booking.Remove(seat);
                                AllSeat_Booking.Remove(seat);
                                seatLeft += 1;
                                labelMessage.Text = "You have unbooked " + seat.ComputeSeatLabel() + "\n\nSeats Remaining: " + seatLeft;
                            }
                            else
                            {
                                var seatName = seat.ParentTreeNode.ChildNode[1].Data;
                                labelMessage.Text = "Please unbook " + seatName.ComputeSeatLabel() + " first!";
                            }
                        }
                        else
                        {
                            var seatName = seat.ParentTreeNode.ChildNode[0].Data;
                            labelMessage.Text = "Please unbook " + seatName.ComputeSeatLabel() + " first!";
                        }
                    }
                }
            }
        }

        private void button_Person_A_Click(object sender, EventArgs e)
        {
            person = "A";
            seatLeft = seatLeft_A;
            labelMessage.Text = "Person A Booking\n\nSeats Remaining: " + seatLeft;
        }

        private void button_Person_B_Click(object sender, EventArgs e)
        {
            selectionTime = 0;
            lockSurroundingSeats = true;
            person = "B";
            seatLeft = seatLeft_B;
            button_Person_A.BackColor = Color.DarkGray;
            ChangeBookedSeatColor(AllSeat_Booking, BookableSeatList);
            if (safe_distance == true)
            {
                ChangeSeatColor(Person_A_Booking, LockedSeats);
            }
            labelMessage.Text = "Person B Booking\n\nSeats Remaining: " + seatLeft;
        }

        private void button_Person_C_Click(object sender, EventArgs e)
        {
            selectionTime = 0;
            lockSurroundingSeats = true;
            person = "C";
            seatLeft = seatLeft_C;
            button_Person_B.BackColor = Color.DarkGray;
            ChangeBookedSeatColor(AllSeat_Booking, BookableSeatList);
            if (safe_distance == true)
            {
                ChangeSeatColor(Person_B_Booking, LockedSeats);
            }
            labelMessage.Text = "Person C Booking\n\nSeats Remaining: " + seatLeft;
        }

        private void button_Person_D_Click(object sender, EventArgs e)
        {
            selectionTime = 0;
            person = "D";
            seatLeft = seatLeft_D;
            lockSurroundingSeats = true;
            button_Person_C.BackColor = Color.DarkGray;
            ChangeBookedSeatColor(AllSeat_Booking, BookableSeatList);
            if (safe_distance == true)
            {
                ChangeSeatColor(Person_C_Booking, LockedSeats);
            }
            labelMessage.Text = "Person D Booking\n\nSeats Remaining: " + seatLeft;
        }

        private void button_Reset_Click(object sender, EventArgs e)
        {
            for (var a = 0; a < AllSeat_Booking.Count; a++)
            {
                AllSeat_Booking[a].BookedStatus = false;
            }

            foreach (Control pSeat in panelSeats.Controls)
            {
                if (pSeat.Text != "Screen")
                {
                    pSeat.BackColor = Color.LightGray;
                }
            }

            selectionTime = 0;
            seatLeft_A = 4;
            seatLeft_B = 4;
            seatLeft_C = 4;
            seatLeft_D = 4;
            seatLeft = 0;
            BookableSeatList.Clear();
            AllSeat_Booking.Clear();
            Person_A_Booking.Clear();
            Person_B_Booking.Clear();
            Person_C_Booking.Clear();
            Person_D_Booking.Clear();
            Person_Booking.Clear();
            LockedSeats.Clear();
            labelMessage.Text = "Reset Successful";
        }

        private void button_Save_Click(object sender, EventArgs e)
        {
            button_Person_D.BackColor = Color.DarkGray;
            ChangeBookedSeatColor(AllSeat_Booking, BookableSeatList);
            if (safe_distance == true)
            {
                ChangeSeatColor(Person_D_Booking, LockedSeats);
            }

            string filepath = System.IO.Path.GetDirectoryName(Application.ExecutablePath) + "\\Seat Booking Results.txt";
            BinaryFormatter f = new BinaryFormatter();
            Stream stream = new FileStream(@filepath, FileMode.OpenOrCreate, FileAccess.Write);
            List<string> All_Seat = new List<string>();
            for (var a = 0; a < AllSeat_Booking.Count; a++)
            {
                All_Seat.Add(AllSeat_Booking[a].ComputeSeatLabel());
            }
            f.Serialize(stream, All_Seat);
            string filepath2 = System.IO.Path.GetDirectoryName(Application.ExecutablePath) + "\\Locked Seat Booking Results.txt";
            Stream stream2 = new FileStream(@filepath2, FileMode.OpenOrCreate, FileAccess.Write);
            List<string> Locked_Seat = new List<string>();
            for (var a = 0; a < LockedSeats.Count; a++)
            {
                Locked_Seat.Add(LockedSeats[a].ComputeSeatLabel());
            }
            f.Serialize(stream2, Locked_Seat);
            stream.Close();
            MessageBox.Show("Saved To Binary File");
        }

        private void buttonStartCreateAndDisplay_Click_Click(object sender, EventArgs e)
        {
            TextReader tr = null;
            string line = null;
            string filepath = System.IO.Path.GetDirectoryName(Application.ExecutablePath) + "\\Seat Booking Results.txt";
            string filepath2 = System.IO.Path.GetDirectoryName(Application.ExecutablePath) + "\\Locked Seat Booking Results.txt";
            string text = "";
            try
            {
                tr = new StreamReader(filepath);
                line = tr.ReadLine();

                do
                {
                    text += line + "\r\n";
                    line = tr.ReadLine();
                } while (line != null);
                tr.Close();

                Stream stream = new FileStream(@filepath, FileMode.OpenOrCreate, FileAccess.Read);
                Stream stream2 = new FileStream(@filepath2, FileMode.OpenOrCreate, FileAccess.Read);
                BinaryFormatter f = new BinaryFormatter();
                List<string> All_Seats = new List<string>();
                List<string> Locked_Seats = new List<string>();
                if (stream.Length != 0)
                {
                    All_Seats = (List<string>)f.Deserialize(stream);
                    Locked_Seats = (List<string>)f.Deserialize(stream2);
                    foreach (Control pSeat in panelSeats.Controls)
                    {
                        for (var a = 0; a < All_Seats.Count; a++)
                        {
                            if (All_Seats[a] == pSeat.Text)
                            {
                                pSeat.BackColor = Color.Red;
                            }
                        }

                        for (var b = 0; b < Locked_Seats.Count; b++)
                        {
                            if (pSeat.Text == Locked_Seats[b])
                            {
                                pSeat.BackColor = Color.Black;
                            }
                        }
                    }
                }
                stream.Close();
            }

            catch (Exception ex)
            {
                if (ex is FileNotFoundException)
                {
                    text = "Unable to find the file to open.";
                }
            }
            labelMessage.Text = "Seat Loaded";
        }

        private void ChangeBookedSeatColor(List<Seat> AllSeat_Booking, List<Seat> BookableSeatList)
        {
            foreach (Control pSeat in panelSeats.Controls)
            {
                for (var a = 0; a < BookableSeatList.Count; a++)
                {
                    if (pSeat.Text == BookableSeatList[a].ComputeSeatLabel())
                    {
                        pSeat.BackColor = Color.LightGray;
                    }
                }

                for (var b = 0; b < AllSeat_Booking.Count; b++)
                {
                    if (AllSeat_Booking[b].ComputeSeatLabel() == pSeat.Text)
                    {
                        pSeat.BackColor = Color.Red;
                    }
                }
            }
        }

        private void ChangeSeatColor(List<Seat> Person_Booking, List<Seat> LockedSeats)
        {
            _seatBlock.LockingSurroundingSeats(Person_Booking, LockedSeats);

            foreach (Control pSeat in panelSeats.Controls)
            {
                for (var c = 0; c < LockedSeats.Count; c++)
                {
                    if (LockedSeats[c].ComputeSeatLabel() == pSeat.Text)
                    {
                        LockedSeats[c].BookedStatus = true;
                        pSeat.BackColor = Color.Black;
                    }
                }
            }
        }
    }
}
