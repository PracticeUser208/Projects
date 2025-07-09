using System;
using System.Collections.Generic;
using System.Text;
namespace SeatBookingSimulator.Classes
{
    [Serializable]
    class Node
    {
        public Node prev;
        public Seat seat;
        public Node next;

        public Node(Seat pSeat)
        {
            seat = pSeat;
            prev = null;
            next = null;
        }
    }
}