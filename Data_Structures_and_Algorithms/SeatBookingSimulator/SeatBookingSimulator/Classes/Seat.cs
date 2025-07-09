using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
namespace SeatBookingSimulator.Classes
{
    [Serializable]
    class Seat
    {
        private bool _seatBookedStatus = false;

        private int _row;
        private int _seatNumber;
        private int _segment;
        private int _segmentStartRow;
        private int _segmentEndRow;

        private string _person;
        private string _position;

        private Node _parentLinkedListNode = null;
        private SeatTreeNode _parentTreeNode = null;

        public Node ParentLinkedListNode
        {
            get { return _parentLinkedListNode; }
            set { _parentLinkedListNode = value; }
        }

        public SeatTreeNode ParentTreeNode
        {
            get { return _parentTreeNode; }
            set { _parentTreeNode = value; }
        }

        public int Row // property
        {
            get { return _row; } // get method
            set { _row = value; } // set method
        }

        public int SeatNumber // property
        {
            get { return _seatNumber; } // get method
            set { _seatNumber = value; } // set method
        }

        public int SegmentStartRow // property
        {
            get { return _segmentStartRow; } // get method
            set { _segmentStartRow = value; } // set method
        }

        public int SegmentEndRow // property
        {
            get { return _segmentEndRow; } // get method
            set { _segmentEndRow = value; } // set method
        }

        public int Segment_No
        {
            get { return _segment; } // get method
            set { _segment = value; } // set method
        }

        public bool BookedStatus // property
        {
            get { return _seatBookedStatus; } // get method
            set { _seatBookedStatus = value; } // set method
        }

        public string Person
        {
            get { return _person; } // get method
            set { _person = value; } // set method
        }

        public string Position
        {
            get { return _position; } // get method
            set { _position = value; } // set method
        }

        public string ComputeSeatLabel()
        {
            return ((char)(_row + 64)).ToString() + _seatNumber.ToString();
        }
    }
}