using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using SeatBookingSimulator.Classes;

namespace SeatBookingSimulator.Classes
{ // The SeatManager class has methods to manage the double linked list.
  // For example, InsertOneSeat, ResetAllSeatStatus,
  //FindOneSeatToBook, FindOneSeatToUnbook etc.
    [Serializable]
    class SeatManager
    {
        DoubleLinkedList _seats;

        public SeatManager()
        {
            _seats = new DoubleLinkedList();
        }

        public Seat InsertOneSeat(int row, int column, List<int> Dimensions_Horizontal, List<int> Dimensions_Vertical)
        {
            Seat newSeat = new Seat();

            //Setup the Seat object
            newSeat.Row = row;
            newSeat.SeatNumber = column;

            int Index_Vertical = 0, Index_Horizontal = 0, Skip_Vertical = 0, Skip_Horizontal = 0;

            while (newSeat.Segment_No == 0) // Null
            {
                if (row <= Dimensions_Horizontal[Index_Horizontal]) // If Seat generated Row <= AisleRow
                {
                    if (column <= Dimensions_Vertical[Index_Vertical]) // If Seat generated Column <= AisleColumn
                    {
                        newSeat.Segment_No = Skip_Vertical + Skip_Horizontal + 1;
                    }
                    else
                    {
                        Index_Vertical += 1;
                        Skip_Vertical += (Dimensions_Horizontal.Count);
                    }
                }
                else
                {
                    Index_Horizontal += 1;
                    Skip_Horizontal += 1;
                }
            }

            //Insert the Seat object into the double linked list.
            _seats.InsertAtEnd(newSeat);
            _seats.SortAscending();

            return newSeat;
        }

        public Seat FindOneSeatToBook(int row, int column, string person)
        {
            Seat seat = _seats.SearchByRowAndColumn(row, column);
            seat.Person = person;

            return seat;
        }

        public Seat FindOneSeatToUnbook(int row, int column, string person)
        {
            Seat seat = _seats.SearchByRowAndColumn(row, column);
            seat.Person = null;

            return seat;
        }

        public List<int> SegmentSeatCounter(List<int> SegmentCount)
        {
            _seats.SeatCounter(SegmentCount);
            return SegmentCount;
        }
    }
}
