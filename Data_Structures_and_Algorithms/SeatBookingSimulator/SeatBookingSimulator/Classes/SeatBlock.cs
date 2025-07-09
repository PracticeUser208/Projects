using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
namespace SeatBookingSimulator.Classes
{
    class SeatBlock
    {
        public List<Seat> BuildValidationTreeNoRestriction(Seat firstPrioritySeat, int depth)
        {
            List<Seat> seatSelectable = new List<Seat>();
            SeatTreeNode rootNode = new SeatTreeNode();
            SeatTreeNode childTreeNode = null;
            rootNode.Data = firstPrioritySeat;

            if (depth >= 1)
            {
                CalculatePosition(firstPrioritySeat);
                seatSelectable = CheckMethodForNoRestriction(seatSelectable, rootNode, childTreeNode, firstPrioritySeat);
            }

            if (depth >= 2)
            {
                Seat secondPrioritySeat = rootNode.ChildNode[0].Data;
                CalculatePosition(secondPrioritySeat);
                seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode, childTreeNode, secondPrioritySeat, 0);

                if (rootNode.ChildNode.Count >= 2)
                {
                    secondPrioritySeat = rootNode.ChildNode[1].Data;
                    CalculatePosition(secondPrioritySeat);
                    seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode, childTreeNode, secondPrioritySeat, 1);
                }

                if (rootNode.ChildNode.Count == 3)
                {
                    secondPrioritySeat = rootNode.ChildNode[2].Data;
                    CalculatePosition(secondPrioritySeat);
                    seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode, childTreeNode, secondPrioritySeat, 2);
                }
            }

            if (depth >= 3)
            {
                if (rootNode.ChildNode.Count >= 1)
                {
                    if (rootNode.ChildNode[0].ChildNode.Count != 0)
                    {
                        Seat thirdPrioritySeat = rootNode.ChildNode[0].ChildNode[0].Data;
                        CalculatePosition(thirdPrioritySeat);
                        seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode.ChildNode[0], childTreeNode, thirdPrioritySeat, 0);
                    }
                }

                if (rootNode.ChildNode.Count >= 2)
                {
                    if (rootNode.ChildNode[1].ChildNode.Count != 0)
                    {
                        Seat thirdPrioritySeat = rootNode.ChildNode[1].ChildNode[0].Data;
                        CalculatePosition(thirdPrioritySeat);
                        seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode.ChildNode[1], childTreeNode, thirdPrioritySeat, 0);
                    }
                }

                if (rootNode.ChildNode.Count == 3)
                {
                    if (rootNode.ChildNode[2].ChildNode.Count != 0)
                    {
                        Seat thirdPrioritySeat = rootNode.ChildNode[2].ChildNode[0].Data;
                        CalculatePosition(thirdPrioritySeat);
                        seatSelectable = CheckMethodForChildForNoRestriction(seatSelectable, rootNode.ChildNode[2], childTreeNode, thirdPrioritySeat, 0);
                    }
                }
            }

            PrintTree(rootNode, " ", false);
            return seatSelectable;
        }

        public List<Seat> BuildValidationTreeWithRestriction(Seat firstPrioritySeat, int depth)
        {
            List<Seat> seatSelectable = new List<Seat>();
            SeatTreeNode rootNode = new SeatTreeNode();
            SeatTreeNode childTreeNode = null;
            rootNode.Data = firstPrioritySeat;

            if (depth >= 1)
            {
                CalculatePosition(firstPrioritySeat);
                seatSelectable = CheckMethodForWithRestriction(seatSelectable, rootNode, childTreeNode, firstPrioritySeat);
            }

            if (depth >= 2)
            {
                if (rootNode.ChildNode.Count != 0)
                {
                    Seat secondPrioritySeat = rootNode.ChildNode[0].Data;
                    CalculatePosition(secondPrioritySeat);
                    seatSelectable = CheckMethodForChildForWithRestriction(seatSelectable, rootNode, childTreeNode, secondPrioritySeat, 0);

                    if (rootNode.ChildNode.Count == 2)
                    {
                        secondPrioritySeat = rootNode.ChildNode[1].Data;
                        CalculatePosition(secondPrioritySeat);
                        seatSelectable = CheckMethodForChildForWithRestriction(seatSelectable, rootNode, childTreeNode, secondPrioritySeat, 1);
                    }
                }
            }

            if (depth >= 3)
            {
                if (rootNode.ChildNode.Count != 0)
                {
                    if (rootNode.ChildNode[0].ChildNode.Count == 1)
                    {
                        Seat thirdPrioritySeat = rootNode.ChildNode[0].ChildNode[0].Data;
                        CalculatePosition(thirdPrioritySeat);
                    }
                }
            }

            return seatSelectable;
        }

        private List<Seat> CheckMethodForNoRestriction(List<Seat> seatSelectable, SeatTreeNode rootNode, SeatTreeNode childTreeNode, Seat PrioritySeat)
        {
            // Add Left Seat
            if (PrioritySeat.Position == null || PrioritySeat.Position.Contains("Right") == true)
            {
                if (PrioritySeat.ParentLinkedListNode.prev.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.prev.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            // Add Right Seat
            if (PrioritySeat.Position == null || PrioritySeat.Position.Contains("Left") == true)
            {
                if (PrioritySeat.ParentLinkedListNode.next.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.next.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            if (PrioritySeat.Position != null)
            {
                if (PrioritySeat.Position.Contains("Bottom") == true || PrioritySeat.Position == "Middle Left" || PrioritySeat.Position == "Middle Right")
                {
                    var PrioritySeat_1 = PrioritySeat;
                    while (PrioritySeat_1.ParentLinkedListNode.prev.seat.SeatNumber != PrioritySeat.SeatNumber)
                    {
                        PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.prev.seat;
                    }
                    if (PrioritySeat_1.ParentLinkedListNode.prev.seat.BookedStatus == false)
                    {
                        childTreeNode = new SeatTreeNode();
                        childTreeNode.Data = PrioritySeat_1.ParentLinkedListNode.prev.seat;
                        childTreeNode.Data.ParentTreeNode = childTreeNode;
                        rootNode.AddNode(childTreeNode);
                        seatSelectable.Add(childTreeNode.Data);
                    }
                }

                if (PrioritySeat.Position.Contains("Top") == true || PrioritySeat.Position == "Middle Left" || PrioritySeat.Position == "Middle Right")
                {
                    var PrioritySeat_1 = PrioritySeat;
                    while (PrioritySeat_1.ParentLinkedListNode.next.seat.SeatNumber != PrioritySeat.SeatNumber)
                    {
                        PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.next.seat;
                    }
                    if (PrioritySeat_1.ParentLinkedListNode.next.seat.BookedStatus == false)
                    {
                        childTreeNode = new SeatTreeNode();
                        childTreeNode.Data = PrioritySeat_1.ParentLinkedListNode.next.seat;
                        childTreeNode.Data.ParentTreeNode = childTreeNode;
                        rootNode.AddNode(childTreeNode);
                        seatSelectable.Add(childTreeNode.Data);
                    }
                }
            }
            return seatSelectable;
        }

        private List<Seat> CheckMethodForChildForNoRestriction(List<Seat> seatSelectable, SeatTreeNode rootNode, SeatTreeNode childTreeNode, Seat PrioritySeat, int index)
        {
            // Add Left Seat
            if (PrioritySeat.Position == null)
            {
                if (PrioritySeat.ParentLinkedListNode.prev.seat != rootNode.Data && PrioritySeat.ParentLinkedListNode.prev.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.prev.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.ChildNode[index].AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            // Add Right Seat
            if (PrioritySeat.Position == null)
            {
                if (PrioritySeat.ParentLinkedListNode.next.seat != rootNode.Data && PrioritySeat.ParentLinkedListNode.next.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.next.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.ChildNode[index].AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            if (PrioritySeat.Position != null)
            {
                if (PrioritySeat.Row != rootNode.Data.Row)
                {
                    if (PrioritySeat.Position.Contains("Left") && PrioritySeat.ParentLinkedListNode.next.seat.BookedStatus == false)
                    {
                        childTreeNode = new SeatTreeNode();
                        childTreeNode.Data = PrioritySeat.ParentLinkedListNode.next.seat;
                        childTreeNode.Data.ParentTreeNode = childTreeNode;
                        rootNode.ChildNode[index].AddNode(childTreeNode);
                        seatSelectable.Add(childTreeNode.Data);
                    }
                    else if (PrioritySeat.Position.Contains("Right") && PrioritySeat.ParentLinkedListNode.prev.seat.BookedStatus == false)
                    {
                        childTreeNode = new SeatTreeNode();
                        childTreeNode.Data = PrioritySeat.ParentLinkedListNode.prev.seat;
                        childTreeNode.Data.ParentTreeNode = childTreeNode;
                        rootNode.ChildNode[index].AddNode(childTreeNode);
                        seatSelectable.Add(childTreeNode.Data);
                    }
                }
                else
                {
                    if (PrioritySeat.Position.Contains("Bottom") == true || PrioritySeat.Position == "Middle Left" || PrioritySeat.Position == "Middle Right")
                    {
                        var PrioritySeat_1 = PrioritySeat;
                        while (PrioritySeat_1.ParentLinkedListNode.prev.seat.SeatNumber != PrioritySeat.SeatNumber)
                        {
                            PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.prev.seat;
                        }
                        if (PrioritySeat_1.ParentLinkedListNode.prev.seat.BookedStatus == false)
                        {
                            childTreeNode = new SeatTreeNode();
                            childTreeNode.Data = PrioritySeat_1.ParentLinkedListNode.prev.seat;
                            childTreeNode.Data.ParentTreeNode = childTreeNode;
                            rootNode.ChildNode[index].AddNode(childTreeNode);
                            seatSelectable.Add(childTreeNode.Data);
                        }
                    }

                    if (PrioritySeat.Position.Contains("Top") == true || PrioritySeat.Position == "Middle Left" || PrioritySeat.Position == "Middle Right")
                    {
                        var PrioritySeat_1 = PrioritySeat;
                        while (PrioritySeat_1.ParentLinkedListNode.next.seat.SeatNumber != PrioritySeat.SeatNumber)
                        {
                            PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.next.seat;
                        }
                        if (PrioritySeat_1.ParentLinkedListNode.next.seat.BookedStatus == false)
                        {
                            childTreeNode = new SeatTreeNode();
                            childTreeNode.Data = PrioritySeat_1.ParentLinkedListNode.next.seat;
                            childTreeNode.Data.ParentTreeNode = childTreeNode;
                            rootNode.ChildNode[index].AddNode(childTreeNode);
                            seatSelectable.Add(childTreeNode.Data);
                        }
                    }
                }
            }
            return seatSelectable;
        }

        private List<Seat> CheckMethodForWithRestriction(List<Seat> seatSelectable, SeatTreeNode rootNode, SeatTreeNode childTreeNode, Seat PrioritySeat)
        {
            // Add Left Seat
            if (PrioritySeat.Position == null || PrioritySeat.Position.Contains("Right") == true)
            {
                if (PrioritySeat.ParentLinkedListNode.prev.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.prev.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            // Add Right Seat
            if (PrioritySeat.Position == null || PrioritySeat.Position.Contains("Left") == true)
            {
                if (PrioritySeat.ParentLinkedListNode.next.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.next.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            return seatSelectable;
        }

        private List<Seat> CheckMethodForChildForWithRestriction(List<Seat> seatSelectable, SeatTreeNode rootNode, SeatTreeNode childTreeNode, Seat PrioritySeat, int index)
        {
            if (PrioritySeat.SeatNumber < rootNode.Data.SeatNumber && PrioritySeat.Position == null)
            {
                if (PrioritySeat.ParentLinkedListNode.prev.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.prev.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.ChildNode[index].AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }

            else if (PrioritySeat.SeatNumber > rootNode.Data.SeatNumber && PrioritySeat.Position == null)
            {
                if (PrioritySeat.ParentLinkedListNode.next.seat.BookedStatus == false)
                {
                    childTreeNode = new SeatTreeNode();
                    childTreeNode.Data = PrioritySeat.ParentLinkedListNode.next.seat;
                    childTreeNode.Data.ParentTreeNode = childTreeNode;
                    rootNode.ChildNode[index].AddNode(childTreeNode);
                    seatSelectable.Add(childTreeNode.Data);
                }
            }
            return seatSelectable;
        }

        private string CalculatePosition(Seat PrioritySeat)
        {
            int value = 1;
            var PrioritySeat_1 = PrioritySeat;
            string position = "";

            while (PrioritySeat_1.ParentLinkedListNode.prev != null)
            {
                if (PrioritySeat_1.ParentLinkedListNode.prev.seat.Segment_No == PrioritySeat.Segment_No)
                {
                    PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.prev.seat;
                }
                else
                {
                    break;
                }
            }

            int originalRowValue = PrioritySeat_1.Row;
            int originalSeatNumber = PrioritySeat_1.SeatNumber;
            int finalSeatNumber = 0;

            while (PrioritySeat_1.ParentLinkedListNode.next != null)
            {
                if (PrioritySeat_1.ParentLinkedListNode.next.seat.Segment_No == PrioritySeat_1.Segment_No)
                {
                    if (PrioritySeat_1.ParentLinkedListNode.next.seat.SeatNumber == originalSeatNumber)
                    {
                        finalSeatNumber = PrioritySeat_1.SeatNumber;
                    }

                    PrioritySeat_1 = PrioritySeat_1.ParentLinkedListNode.next.seat;
                    value += 1;
                }
                else
                {
                    break;
                }
            }

            int finalRowValue = PrioritySeat_1.Row;

            if (PrioritySeat.Row != originalRowValue && PrioritySeat.Row != finalRowValue)
            {
                if (PrioritySeat.SeatNumber == originalSeatNumber)
                {
                    PrioritySeat.Position = "Middle Left";
                }
                else if (PrioritySeat.SeatNumber == finalSeatNumber)
                {
                    PrioritySeat.Position = "Middle Right";
                }
            }
            else if (PrioritySeat.Row == originalRowValue)
            {
                if (PrioritySeat.SeatNumber == originalSeatNumber)
                {
                    PrioritySeat.Position = "Top Left";
                }
                else if (PrioritySeat.SeatNumber == finalSeatNumber)
                {
                    PrioritySeat.Position = "Top Right";
                }
            }
            else
            {
                if (PrioritySeat.SeatNumber == originalSeatNumber)
                {
                    PrioritySeat.Position = "Bottom Left";
                }
                else if (PrioritySeat.SeatNumber == finalSeatNumber)
                {
                    PrioritySeat.Position = "Bottom Right";
                }
            }

            PrioritySeat.SegmentStartRow = originalRowValue;
            PrioritySeat.SegmentEndRow = finalRowValue;
            return position;
        }

        public static void PrintTree(SeatTreeNode rootNode, string pIndent, bool pLast)
        {
            SeatTreeNode tree = rootNode;
            int numberOfChildNodes = tree.ChildNode.Count;
            string indent = pIndent;
            Debug.Write(indent);
            Debug.Write("+-");
            indent += "| ";
            Debug.WriteLine(tree.Data.ComputeSeatLabel());
            for (int i = 0; i < numberOfChildNodes; i++)
            {
                PrintTree(tree.ChildNode[i], indent, i == numberOfChildNodes - 1);
            }
        }

        public List<Seat> LockingSurroundingSeats(List<Seat> Person_Booking, List<Seat> LockedSeats)
        {
            for (var a = 0; a < Person_Booking.Count; a++)
            {
                Seat seat = Person_Booking[a];
                if (seat.Row >= seat.SegmentStartRow && seat.Row != seat.SegmentEndRow) // Segment Starting Row or between
                {
                    var seat_1 = seat;
                    while (seat_1.ParentLinkedListNode.next.seat.SeatNumber != seat.SeatNumber)
                    {
                        seat_1 = seat_1.ParentLinkedListNode.next.seat;
                    }
                    seat_1.ParentLinkedListNode.next.seat.BookedStatus = true;
                    LockedSeats.Add(seat_1.ParentLinkedListNode.next.seat);
                }

                if (seat.Row <= seat.SegmentEndRow && seat.Row != seat.SegmentStartRow) // Segment Ending Row or between
                {
                    var seat_1 = seat;
                    while (seat_1.ParentLinkedListNode.prev.seat.SeatNumber != seat.SeatNumber)
                    {
                        seat_1 = seat_1.ParentLinkedListNode.prev.seat;
                    }
                    seat_1.ParentLinkedListNode.prev.seat.BookedStatus = true;
                    LockedSeats.Add(seat_1.ParentLinkedListNode.prev.seat);
                }

                if (Person_Booking.Contains(seat.ParentLinkedListNode.prev.seat) == false)
                {
                    if (seat.ParentLinkedListNode.prev.seat.Row == seat.Row)
                    {
                        seat.ParentLinkedListNode.prev.seat.BookedStatus = true;
                        LockedSeats.Add(seat.ParentLinkedListNode.prev.seat);
                    }
                }

                if (Person_Booking.Contains(seat.ParentLinkedListNode.next.seat) == false)
                {
                    if (seat.ParentLinkedListNode.next.seat.Row == seat.Row)
                    {
                        seat.ParentLinkedListNode.next.seat.BookedStatus = true;
                        LockedSeats.Add(seat.ParentLinkedListNode.next.seat);
                    }
                }
            }
            return LockedSeats;
        }
    }
}
